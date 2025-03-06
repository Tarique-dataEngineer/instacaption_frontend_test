import type { MetaFunction } from "@remix-run/node";
import Header from "~/components/Header";
import Steps from "~/components/Steps";
import Description from "~/components/Description"
import Testimonials from "~/components/Testimonials";
import GenerateBtn from "~/components/GenerateBtn";


export const meta: MetaFunction = () => {
  return [
    { title: "instacaption" },
    { name: "description", content: "Welcome to instacaption!" },
  ];
};

export default function Index() {
  return (
    <div>
      
      <Header />
      <Steps />
      <Description />
      <Testimonials />
      <GenerateBtn />
      
    </div>
  );
}
