"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Bell,
  Lock,
  User,
  Palette,
  Globe,
  Shield,
  CreditCard,
  KeyRound,
} from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 bg-gradient-to-br from-zinc-900/80 via-zinc-900/50 to-zinc-900/30 p-8 rounded-xl border border-zinc-800/50 relative overflow-hidden backdrop-blur-xl">
        <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_-100px,#f059da15,transparent)] pointer-events-none" />
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:16px] pointer-events-none" />
        <div className="relative">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-zinc-500">
            Settings
          </h1>
          <p className="text-zinc-400 mt-2 text-lg">
            Manage your account settings and preferences.
          </p>
        </div>
      </div>

      <Tabs defaultValue="account" className="space-y-6">
        <TabsList className="bg-gradient-to-r from-zinc-900/80 to-zinc-900/50 border border-zinc-800/50 p-1">
          <TabsTrigger value="account" className="data-[state=active]:bg-[#f059da]/10 data-[state=active]:text-white transition-colors">
            <User className="h-4 w-4 mr-2" />
            Account
          </TabsTrigger>
          <TabsTrigger value="notifications" className="data-[state=active]:bg-[#f059da]/10 data-[state=active]:text-white transition-colors">
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="security" className="data-[state=active]:bg-[#f059da]/10 data-[state=active]:text-white transition-colors">
            <Shield className="h-4 w-4 mr-2" />
            Security
          </TabsTrigger>
          <TabsTrigger value="billing" className="data-[state=active]:bg-[#f059da]/10 data-[state=active]:text-white transition-colors">
            <CreditCard className="h-4 w-4 mr-2" />
            Billing
          </TabsTrigger>
        </TabsList>

        <TabsContent value="account" className="space-y-6">
          {/* Profile Settings */}
          <Card className="bg-gradient-to-br from-zinc-900/80 to-zinc-900/50 border-zinc-800/50 hover:border-zinc-700/50 transition-colors">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <User className="h-5 w-5 text-[#f059da]" />
                Profile Information
              </CardTitle>
              <CardDescription className="text-zinc-400">
                Update your profile details and public information.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label className="text-zinc-300">Name</Label>
                  <Input
                    placeholder="Your name"
                    className="bg-zinc-900/80 border-zinc-800/50 focus-visible:ring-[#f059da] focus-visible:ring-opacity-50 placeholder:text-zinc-600"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-zinc-300">Username</Label>
                  <Input
                    placeholder="@username"
                    className="bg-zinc-900/80 border-zinc-800/50 focus-visible:ring-[#f059da] focus-visible:ring-opacity-50 placeholder:text-zinc-600"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label className="text-zinc-300">Email</Label>
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    className="bg-zinc-900/80 border-zinc-800/50 focus-visible:ring-[#f059da] focus-visible:ring-opacity-50 placeholder:text-zinc-600"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label className="text-zinc-300">Bio</Label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about yourself"
                    className="w-full rounded-md bg-zinc-900/80 border border-zinc-800/50 p-3 text-sm text-white placeholder:text-zinc-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#f059da] focus-visible:ring-opacity-50"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Preferences */}
          <Card className="bg-gradient-to-br from-zinc-900/80 to-zinc-900/50 border-zinc-800/50 hover:border-zinc-700/50 transition-colors">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Palette className="h-5 w-5 text-[#f059da]" />
                Preferences
              </CardTitle>
              <CardDescription className="text-zinc-400">
                Customize your app experience.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-4 rounded-lg bg-zinc-900/50 border border-zinc-800/50">
                <div className="space-y-0.5">
                  <Label className="text-zinc-300">Dark Mode</Label>
                  <p className="text-sm text-zinc-400">
                    Toggle dark mode appearance
                  </p>
                </div>
                <Switch className="data-[state=checked]:bg-[#f059da]" />
              </div>
              <div className="flex items-center justify-between p-4 rounded-lg bg-zinc-900/50 border border-zinc-800/50">
                <div className="space-y-0.5">
                  <Label className="text-zinc-300">Public Profile</Label>
                  <p className="text-sm text-zinc-400">
                    Make your profile visible to everyone
                  </p>
                </div>
                <Switch className="data-[state=checked]:bg-[#f059da]" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card className="bg-gradient-to-br from-zinc-900/80 to-zinc-900/50 border-zinc-800/50 hover:border-zinc-700/50 transition-colors">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Bell className="h-5 w-5 text-[#f059da]" />
                Notification Settings
              </CardTitle>
              <CardDescription className="text-zinc-400">
                Choose what notifications you want to receive.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-4 rounded-lg bg-zinc-900/50 border border-zinc-800/50">
                <div className="space-y-0.5">
                  <Label className="text-zinc-300">Email Notifications</Label>
                  <p className="text-sm text-zinc-400">
                    Receive email about your account activity
                  </p>
                </div>
                <Switch className="data-[state=checked]:bg-[#f059da]" />
              </div>
              <div className="flex items-center justify-between p-4 rounded-lg bg-zinc-900/50 border border-zinc-800/50">
                <div className="space-y-0.5">
                  <Label className="text-zinc-300">Push Notifications</Label>
                  <p className="text-sm text-zinc-400">
                    Receive push notifications on your device
                  </p>
                </div>
                <Switch className="data-[state=checked]:bg-[#f059da]" />
              </div>
              <div className="flex items-center justify-between p-4 rounded-lg bg-zinc-900/50 border border-zinc-800/50">
                <div className="space-y-0.5">
                  <Label className="text-zinc-300">Marketing Emails</Label>
                  <p className="text-sm text-zinc-400">
                    Receive emails about new features and updates
                  </p>
                </div>
                <Switch className="data-[state=checked]:bg-[#f059da]" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card className="bg-gradient-to-br from-zinc-900/80 to-zinc-900/50 border-zinc-800/50 hover:border-zinc-700/50 transition-colors">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Shield className="h-5 w-5 text-[#f059da]" />
                Security Settings
              </CardTitle>
              <CardDescription className="text-zinc-400">
                Manage your account security preferences.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-4 rounded-lg bg-zinc-900/50 border border-zinc-800/50">
                <div className="space-y-0.5">
                  <Label className="text-zinc-300">Two-Factor Authentication</Label>
                  <p className="text-sm text-zinc-400">
                    Add an extra layer of security to your account
                  </p>
                </div>
                <Switch className="data-[state=checked]:bg-[#f059da]" />
              </div>
              <div className="space-y-4">
                <Label className="text-zinc-300">Change Password</Label>
                <div className="grid gap-4">
                  <Input
                    type="password"
                    placeholder="Current password"
                    className="bg-zinc-900/80 border-zinc-800/50 focus-visible:ring-[#f059da] focus-visible:ring-opacity-50 placeholder:text-zinc-600"
                  />
                  <Input
                    type="password"
                    placeholder="New password"
                    className="bg-zinc-900/80 border-zinc-800/50 focus-visible:ring-[#f059da] focus-visible:ring-opacity-50 placeholder:text-zinc-600"
                  />
                  <Input
                    type="password"
                    placeholder="Confirm new password"
                    className="bg-zinc-900/80 border-zinc-800/50 focus-visible:ring-[#f059da] focus-visible:ring-opacity-50 placeholder:text-zinc-600"
                  />
                </div>
                <Button className="bg-[#f059da] hover:bg-[#f059da]/90 text-white shadow-lg shadow-[#f059da]/20 transition-all hover:shadow-xl hover:shadow-[#f059da]/30">
                  Update Password
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing" className="space-y-6">
          <Card className="bg-gradient-to-br from-zinc-900/80 to-zinc-900/50 border-zinc-800/50 hover:border-zinc-700/50 transition-colors">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-[#f059da]" />
                Billing Information
              </CardTitle>
              <CardDescription className="text-zinc-400">
                Manage your billing details and subscription.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="rounded-lg bg-gradient-to-r from-zinc-900/80 to-zinc-900/50 border border-zinc-800/50 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-white">Pro Plan</p>
                    <p className="text-sm text-zinc-400">$29/month</p>
                  </div>
                  <Button variant="outline" className="border-zinc-700/50 hover:border-zinc-600 hover:bg-[#f059da]/10 hover:text-white transition-colors">
                    Change Plan
                  </Button>
                </div>
              </div>
              <div className="space-y-4">
                <Label className="text-zinc-300">Payment Method</Label>
                <div className="rounded-lg bg-gradient-to-r from-zinc-900/80 to-zinc-900/50 border border-zinc-800/50 p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="h-8 w-12 rounded bg-gradient-to-br from-zinc-800 to-zinc-700" />
                      <div>
                        <p className="text-sm font-medium text-white">
                          •••• 4242
                        </p>
                        <p className="text-sm text-zinc-400">Expires 12/24</p>
                      </div>
                    </div>
                    <Button variant="ghost" className="text-zinc-400 hover:text-white hover:bg-[#f059da]/10 transition-colors">
                      Edit
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
