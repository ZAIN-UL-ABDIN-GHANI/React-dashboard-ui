import React from "react";
import userIcon from "../../public/asset/img/users-icon.png";
import caseIcon from "../../public/asset/img/case-icon.png";
import subsIcon from "../../public/asset/img/subs-icon.png";

const DashboardFirstCards = ({ data }) => {
  const defaultData = {
    users: 94,
    cases: 70,
    subscriptions: 80,
  };
  const dashboardHeadlineCards = [
    {
      id: 0,
      icon: userIcon,
      total: "Total Users",
      numbers: data?.users ?? defaultData.users,
    },
    {
      id: 1,
      icon: caseIcon,
      total: "Total Case",
      numbers: data?.cases ?? defaultData.cases,
    },
    {
      id: 2,
      icon: subsIcon,
      total: "Total Subscription",
      numbers: data?.subscriptions ?? defaultData.subscriptions,
    },
  ];
  return (
    <>
      {dashboardHeadlineCards.map((card) => (
        <div
          key={card.id}
          className="  flex flex-col items-start justify-center  p-3 gap-y-3 w-[97%] sm:w-[46%] md:w-[48.7%] lg:w-[23%] xl:w-[23.7%] bg-[#F8F8F8] border rounded-lg py-4"
        >
          <div className="p-1 bg-white">
            <img src={card.icon} className="h-5" alt="" />
          </div>
          <h6>{card.total}</h6>
          <div className="text-3xl font-semibold">{card.numbers}</div>
        </div>
      ))}
    </>
  );
};

export default DashboardFirstCards;
