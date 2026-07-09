"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LayoutDashboard, User, Mail } from "lucide-react";
import { Show } from "@/components/auth/show";
import { useAuth } from "@/components/auth/auth-provider";

function ProfileCard() {
  const { user } = useAuth();

  const name = (user as { name?: string | null })?.name ?? null;
  const email = (user as { email?: string | null })?.email ?? null;
  const image = (user as { image?: string | null })?.image ?? null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" aria-hidden="true" />
          Your Profile
        </CardTitle>
        <CardDescription>Your account information</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 text-sm">
          {image ? (
            <img
              src={image}
              alt="Avatar"
              width={64}
              height={64}
              className="h-16 w-16 rounded-full"
            />
          ) : null}
          {name ? (
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
              <span className="font-medium">Name:</span> {name}
            </div>
          ) : null}
          {email ? (
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
              <span className="font-medium">Email:</span> {email}
            </div>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-8 p-8">
      <div className="flex items-center gap-3">
        <LayoutDashboard className="h-6 w-6" aria-hidden="true" />
        <h1 className="text-2xl font-bold">Dashboard</h1>
      </div>

      <Show when="signed-in">
        <ProfileCard />
      </Show>
    </div>
  );
}
