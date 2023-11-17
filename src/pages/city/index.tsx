import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { useEffect } from "react";
import { getCountry } from "@/store/apps/country";
import Link from "next/link";

export default function City() {
  // ** Redux
  const dispatch = useDispatch<AppDispatch>();

  // ** Selector
  const loading: boolean = useSelector(
    (state: RootState) => state.country.loading
  );
  const data: any = useSelector((state: RootState) => state.country.data);

  useEffect(() => {
    dispatch(getCountry());
  }, [dispatch]);

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
        Cities
      </h1>
      <hr />
      {loading ? (
        <h1>Loading..</h1>
      ) : (
        <>
          <div className="flex flex-wrap m-2">
            {data.length > 0 &&
              data[0]?.city.map((k: any, index: any) => {
                return (
                  <div key={index} className="w-1/3">
                    <Link
                      className="border px-1 rounded-full"
                      href={`/city/${k.id}`}
                    >
                      {k.cityName}
                    </Link>
                  </div>
                );
              })}
          </div>
        </>
      )}
    </>
  );
}
