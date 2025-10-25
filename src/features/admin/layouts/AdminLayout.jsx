import React from "react";
import AdminSidebar from "../../../components/Sidebar/AdminSidebar";
import AdminHeader from "../../../components/Header/AdminHeader";
import ChatWidget from "../../chat/components/ChatWidget";
import { getAccessToken } from "../../../utils/storage";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-que-background relative">
      {/* Header */}
      <AdminHeader />

      {/* Sidebar + Main */}
      <div className="flex flex-1">
        <AdminSidebar />
        <main className="p-6 flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>

      {/* Chat widget */}
      {getAccessToken() && <ChatWidget />}
    </div>
  );
}
