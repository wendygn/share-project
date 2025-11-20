import {  Inbox, Send } from "lucide-react";
import { Header } from "../_component/header";

export default function MyDashboard() {
    return (
      <div className="h-full">
        <Header />
        <div className="border-2 border-blue-500 w-4xl m-auto flex flex-col mt-16">
          <div>
            <h3>Dashboard</h3>
            <div className="flex items-start rounded-lg gap-2">
              <div className="flex border-2 w-44 justify-center items-center rounded-sm gap-2 ">
                <Send />
                <p>Sent</p>
              </div>
              <div className="flex  border-2 w-44 justify-center items-center rounded-sm gap-2">
                <Inbox />
                <p>receive</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}