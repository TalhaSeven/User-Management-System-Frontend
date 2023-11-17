import * as yup from "yup";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useForm, Controller, set } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import Input from "@/components/input";
import Select from "@/components/select";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { getCountry } from "@/store/apps/country";
import { getUser } from "@/store/apps/user";
import { setAddress } from "@/store/apps/address";

enum addressType {
  WORK = "work",
  HOME = "home",
  OTHER = "other",
}

type FormValues = {
  addressType: addressType;
  addressLine: string;
  street: string;
  post_code: string;
  location: string;
  userId: number;
  countryId: number;
  cityId: number;
  districtId: number;
  townId: number;
};

const addressFormSchema = yup.object().shape({
  addressType: yup.string().required("Address Type is required"),
  addressLine: yup.string().required("Address Line is required"),
  street: yup.string().required("Street is required"),
  post_code: yup.string().required("Post Code is required"),
  location: yup.string().required("Location is required"),
  userId: yup.number().required("User is required"),
  countryId: yup.number().required("Country is required"),
  cityId: yup.number().required("City is required"),
  districtId: yup.number().required("District is required"),
  townId: yup.number().required("Town is required"),
});

const defaultValues: FormValues = {
  addressType: addressType.HOME,
  addressLine: "",
  street: "",
  post_code: "",
  location: "",
  userId: 0,
  countryId: 0,
  cityId: 0,
  districtId: 0,
  townId: 0,
};

const Address = () => {
  // ** Redux
  const dispatch = useDispatch<AppDispatch>();

  // ** Selector
  const data: any = useSelector((state: RootState) => state.country.data);
  const addressLoading: boolean = useSelector((state: RootState) => state.address.loading);
  const dataUser: any = useSelector((state: RootState) => state.user.data);
  const [city, setCity] = useState<any[]>();
  const [district, setDistrict] = useState<any[]>();
  const [town, setTown] = useState<any[]>();
  const [location, setLocation] = useState<any>("");

  useEffect(() => {
    dispatch(getCountry());
    dispatch(getUser());
  }, [dispatch]);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues,
    resolver: yupResolver(addressFormSchema),
  });

  const onSubmit = (payload: FormValues) => {
    dispatch(setAddress(payload));
    reset(defaultValues);
  };

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        const { latitude, longitude } = coords;
        setLocation(`${latitude} ${longitude}`);
      });
    }
  }, []);

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
      <div className="max-w-2xl mx-auto">
        <h1
          className="text-center text-8xl text-transparent 
        bg-clip-text bg-gradient-to-b from-[#051F91] from-25% to-[#6DDB17]"
        >
          Address Entry
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-wrap -mx-4 py-28 gap-y-2">
            <div className="w-full md:w-1/2 px-1">
              <Controller
                control={control}
                name="addressType"
                render={({ field: { onChange, onBlur, value } }) => (
                  <>
                    <Select
                      className="mt-1"
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                    >
                      <option value="">Address Type</option>
                      <option value={addressType.HOME}>
                        {addressType.HOME}
                      </option>
                      <option value={addressType.WORK}>
                        {addressType.WORK}
                      </option>
                      <option value={addressType.OTHER}>
                        {addressType.OTHER}
                      </option>
                    </Select>
                  </>
                )}
              />
              {errors.addressType && <>{errors.addressType.message}</>}
            </div>
            <div className="w-full md:w-1/2 px-1">
              <Input
                type="text"
                placeholder="Address Line"
                className="mt-1"
                rounded="rounded-2xl"
                {...register("addressLine", { required: true })}
              />
              {errors.addressLine && <>{errors.addressLine.message}</>}
            </div>
            <div className="w-full md:w-1/2 px-1">
              <Input
                type="text"
                placeholder="Street Line"
                className="mt-1"
                rounded="rounded-2xl"
                {...register("street", { required: true })}
              />
              {errors.street && <>{errors.street.message}</>}
            </div>
            <div className="w-full md:w-1/2 px-1">
              <Input
                type="text"
                placeholder="Post Code"
                className="mt-1"
                rounded="rounded-2xl"
                {...register("post_code", { required: true })}
              />
              {errors.post_code && <>{errors.post_code.message}</>}
            </div>
            <div className="w-full md:w-1/2 px-1">
              <Input
                type="text"
                placeholder="Location"
                className="mt-1"
                rounded="rounded-2xl"
                value={location}
                {...register("location", { required: true })}
              />
              {errors.location && <>{errors.location.message}</>}
            </div>
            <div className="w-full md:w-1/2 px-1">
              <Controller
                control={control}
                name="userId"
                render={({ field: { onChange, onBlur, value } }) => (
                  <>
                    <Select
                      className="mt-1"
                      onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                        onChange(e);
                      }}
                      onBlur={onBlur}
                      value={value}
                    >
                      <option value="">User</option>
                      {dataUser.map((user: any) => (
                        <option key={user.id} value={user.id}>
                          First Name:{user.firstName} Last Name{user.lastName}
                        </option>
                      ))}
                    </Select>
                  </>
                )}
              />
              {errors.userId && <>{errors.userId.message}</>}
            </div>
            <div className="w-full md:w-1/2 px-1">
              <Controller
                control={control}
                name="countryId"
                render={({ field: { onChange, onBlur, value } }) => (
                  <>
                    <Select
                      className="mt-1"
                      onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                        const countryId = parseInt(e.target.value);
                        const country = data.find(
                          (k: any) => k.id === countryId
                        );
                        const sortedCities = [...(country?.city || [])].sort(
                          (a, b) => a.cityName.localeCompare(b.cityName)
                        );
                        setCity(sortedCities);
                        onChange(e);
                      }}
                      onBlur={onBlur}
                      value={value}
                    >
                      <option value="">Country</option>
                      {data.map((country: any) => (
                        <option key={country.id} value={country.id}>
                          {country.countryName}
                        </option>
                      ))}
                    </Select>
                  </>
                )}
              />
              {errors.countryId && <>{errors.countryId.message}</>}
            </div>
            <div className="w-full md:w-1/2 px-1">
              <Controller
                control={control}
                name="cityId"
                render={({ field: { onChange, onBlur, value } }) => (
                  <>
                    <Select
                      className="mt-1"
                      onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                        const cityId = parseInt(e.target.value);
                        const selectCity = city?.find(
                          (k: any) => k.id === cityId
                        );
                        const sortedDistrict = [
                          ...(selectCity?.district || []),
                        ].sort((a, b) =>
                          a.districtName.localeCompare(b.districtName)
                        );
                        setDistrict(sortedDistrict);
                        onChange(e);
                      }}
                      onBlur={onBlur}
                      value={value}
                    >
                      <option value="">City</option>
                      {city?.map((city: any) => (
                        <option key={city.id} value={city.id}>
                          {city.cityName}
                        </option>
                      ))}
                    </Select>
                  </>
                )}
              />
              {errors.cityId && <>{errors.cityId.message}</>}
            </div>
            <div className="w-full md:w-1/2 px-1">
              <Controller
                control={control}
                name="districtId"
                render={({ field: { onChange, onBlur, value } }) => (
                  <>
                    <Select
                      className="mt-1"
                      onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                        const districtId = parseInt(e.target.value);
                        const selectDistrict = district?.find(
                          (k: any) => k.id === districtId
                        );
                        const sortedTown = [
                          ...(selectDistrict?.town || []),
                        ].sort((a, b) => a.townName.localeCompare(b.townName));
                        setTown(sortedTown);
                        onChange(e);
                      }}
                      onBlur={onBlur}
                      value={value}
                    >
                      <option value="">District</option>
                      {district?.map((district: any) => (
                        <option key={district.id} value={district.id}>
                          {district.districtName}
                        </option>
                      ))}
                    </Select>
                  </>
                )}
              />
              {errors.districtId && <>{errors.districtId.message}</>}
            </div>
            <div className="w-full md:w-1/2 px-1">
              <Controller
                control={control}
                name="townId"
                render={({ field: { onChange, onBlur, value } }) => (
                  <>
                    <Select
                      className="mt-1"
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                    >
                      <option value="">Town</option>
                      {town?.map((town: any) => (
                        <option key={town.id} value={town.id}>
                          {town.townName}
                        </option>
                      ))}
                    </Select>
                  </>
                )}
              />
              {errors.townId && <>{errors.townId.message}</>}
            </div>
          </div>
          <div className="text-center">
            <button type="submit" disabled={addressLoading}>
              {addressLoading ? <strong>Loading...</strong> : "Submit"}
            </button>
            {/* {addressLoading ? (
              <>
                <strong>Loading..</strong>
              </>
            ) : (
              <button type="submit">Submit</button>
            )} */}
          </div>
        </form>
      </div>
    </>
  );
};

export default Address;
