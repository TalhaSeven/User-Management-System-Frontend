import { AppDispatch, RootState } from "@/store";
import { getCountry } from "@/store/apps/country";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Index = () => {
  const data: any = useSelector((state: RootState) => state.country.data);
  const router: any = useRouter();
  const [cityId, setCityId] = useState<number>(0);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (data.length === 0) dispatch(getCountry());
  }, [dispatch, data.length]);

  useEffect(() => {
    setCityId(parseInt(router.query.id));
  }, [router]);

  return (
    <>
      <Link href="/" className="mx-2">
        Home
      </Link>
      <Link href="/city" className="mx-2">
        Cities
      </Link>
      <Link href="/address" className="mx-2">
        Address
      </Link>
      <h1
        className="text-center text-8xl text-transparent 
        bg-clip-text bg-gradient-to-b from-[#051F91] from-25% to-[#6DDB17]"
      >
        City
      </h1>
      <hr />
      {data[0].city.find((k: any) => k.id === cityId)?.cityName}
      <hr />
      <div className="flex flex-wrap mt-3">
        {data[0].city
          .find((k: any) => k.id === cityId)
          ?.district?.map((k: any, index: any) => {
            return (
              <div key={index}>
                <Link
                  href={`/district/${cityId}/${k.id}`}
                  className="border px-1 rounded-full"
                >
                  {k.districtName}
                </Link>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Index;
