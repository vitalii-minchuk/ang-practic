import { GetServerSideProps, NextPage } from "next";
import useSWR from "swr";
import Header from "../components/header";
import { UserType } from "../types";
import fetcher from "../utils/fetcher";
import getGoogleOAuthUrl from "../utils/get-google-url";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

interface IHome {
  fallbackData: UserType;
}
const Home: NextPage<IHome> = ({ fallbackData }) => {
  const { data, error } = useSWR<UserType | null>(
    `${baseUrl}/api/me`,
    fetcher,
    { fallbackData }
  );

  return (
    <>
      <Header user={data} />
      {!data && (
        <div>
          <h2>Please login</h2>
          <a href={getGoogleOAuthUrl()}>Login with google</a>
        </div>
      )}
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const data = await fetcher(`${baseUrl}/api/me`, context.req.headers);

  return {
    props: {
      fallbackData: data,
    },
  };
};

export default Home;
