import { AppDispatch, RootState } from "@/store";
import { getCountry } from "@/store/apps/country";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

type Props = {};

const District = (props: Props) => {
  // ** Redux
  const dispatch = useDispatch<AppDispatch>();

  // ** Selector
  const loading: boolean = useSelector(
    (state: RootState) => state.country.loading
  );
  const data: any = useSelector((state: RootState) => state.country.data);
  const router: any = useRouter();

  const [cityId, setCityId] = useState<number>(0);
  const [districtId, setDistrictId] = useState<number>(0);

  useEffect(() => {
    if (data.length === 0) dispatch(getCountry());
  }, [dispatch, data.length]);

  useEffect(() => {
    setCityId(parseInt(router.query.id[0]));
    setDistrictId(parseInt(router.query.id[1]));
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
        City - District
      </h1>
      <span className="border px-1 rounded-full">
        {data[0]?.city.find((k: any) => k.id === cityId)?.cityName}
      </span>
      <span className="border px-1 rounded-full">
        {
          data[0]?.city
            .find((k: any) => k.id === cityId)
            ?.district.find((k: any) => k.id === districtId)?.districtName
        }
      </span>
      <hr />
      <div className="flex flex-wrap mt-3">
        {data[0]?.city
          .find((k: any) => k.id === cityId)
          ?.district?.map((k: any, index: number) => {
            return (
              <div className="border px-1 rounded-full" key={index}>
                <Link href={`/district/${cityId}/${k.id}`}>
                  {k.districtName}
                </Link>
              </div>
            );
          })}
      </div>
      <hr />
      <div className="flex flex-wrap mt-3">
        {data[0]?.city
          .find((k: any) => k.id === cityId)
          ?.district?.find((k: any) => k.id === districtId)
          ?.town?.map((k: any, index: number) => {
            return (
              <div className="border px-1 rounded-full" key={index}>
                {k.townName}
              </div>
            );
          })}
      </div>
    </>
  );
};

export default District;
