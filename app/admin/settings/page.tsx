"use client";

import { useState } from "react";
import {
  Settings,
  User,
  Shield,
  Bell,
  Palette,
  Lock,
  Mail,
  Save,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertTriangle,
  Moon,
  Globe,
} from "lucide-react";
import { toast } from "sonner";

type Tab =
  | "general"
  | "account"
  | "security"
  | "notifications"
  | "appearance";

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] =
    useState<Tab>("general");

  const [saving, setSaving] = useState(false);

  const [showPassword, setShowPassword] =
    useState(false);

  const [formData, setFormData] = useState({
    platformName: "QuizMaster",
    platformEmail: "admin@quizmaster.com",
    description:
      "Professional online quiz and assessment platform.",
    adminName: "Administrator",
    adminEmail: "admin@quizmaster.com",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    emailNotifications: true,
    quizNotifications: true,
    userNotifications: true,
    resultNotifications: true,
    maintenanceMode: false,
    allowRegistration: true,
    autoPublishResults: true,
    darkMode: true,
    language: "English",
    timezone: "Asia/Kolkata",
  });

  const updateField = (
    field: keyof typeof formData,
    value: string | boolean
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    setSaving(true);

    await new Promise((resolve) =>
      setTimeout(resolve, 700)
    );

    setSaving(false);

    toast.success(
      "Settings saved successfully."
    );
  };

  const handlePasswordChange = () => {
    if (!formData.currentPassword) {
      toast.error(
        "Please enter your current password."
      );
      return;
    }

    if (formData.newPassword.length < 8) {
      toast.error(
        "New password must contain at least 8 characters."
      );
      return;
    }

    if (
      formData.newPassword !==
      formData.confirmPassword
    ) {
      toast.error(
        "New passwords do not match."
      );
      return;
    }

    toast.success(
      "Password updated successfully."
    );

    setFormData((prev) => ({
      ...prev,
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    }));
  };

  return (
    <main className="min-h-screen bg-[#f7f8fc] text-gray-900">
      {/* Header */}

      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-7 sm:px-8">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
              <Settings size={23} />
            </div>

            <div>
              <h1 className="text-2xl font-black">
                Settings
              </h1>

              <p className="mt-1 text-sm text-gray-400">
                Manage your platform, account and
                security settings.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8">
        <div className="grid gap-7 lg:grid-cols-[250px_1fr]">
          {/* Settings Navigation */}

          <aside className="h-fit rounded-2xl border border-gray-100 bg-white p-3 shadow-sm">
            <SettingsTab
              icon={<Settings size={18} />}
              title="General"
              active={activeTab === "general"}
              onClick={() =>
                setActiveTab("general")
              }
            />

            <SettingsTab
              icon={<User size={18} />}
              title="Admin Account"
              active={activeTab === "account"}
              onClick={() =>
                setActiveTab("account")
              }
            />

            <SettingsTab
              icon={<Shield size={18} />}
              title="Security"
              active={activeTab === "security"}
              onClick={() =>
                setActiveTab("security")
              }
            />

            <SettingsTab
              icon={<Bell size={18} />}
              title="Notifications"
              active={
                activeTab === "notifications"
              }
              onClick={() =>
                setActiveTab("notifications")
              }
            />

            <SettingsTab
              icon={<Palette size={18} />}
              title="Appearance"
              active={
                activeTab === "appearance"
              }
              onClick={() =>
                setActiveTab("appearance")
              }
            />
          </aside>

          {/* Content */}

          <section>
            {/* GENERAL */}

            {activeTab === "general" && (
              <SettingsCard
                title="General Settings"
                description="Configure basic information and platform behaviour."
              >
                <div className="grid gap-6 md:grid-cols-2">
                  <InputField
                    label="Platform Name"
                    value={formData.platformName}
                    onChange={(value) =>
                      updateField(
                        "platformName",
                        value
                      )
                    }
                  />

                  <InputField
                    label="Platform Email"
                    type="email"
                    value={formData.platformEmail}
                    onChange={(value) =>
                      updateField(
                        "platformEmail",
                        value
                      )
                    }
                  />
                </div>

                <div className="mt-6">
                  <label className="mb-2 block text-sm font-bold">
                    Platform Description
                  </label>

                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      updateField(
                        "description",
                        e.target.value
                      )
                    }
                    rows={4}
                    className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:bg-white"
                  />
                </div>

                <div className="mt-7 space-y-3">
                  <Toggle
                    title="Allow Student Registration"
                    description="Allow new students to create accounts."
                    checked={
                      formData.allowRegistration
                    }
                    onChange={(value) =>
                      updateField(
                        "allowRegistration",
                        value
                      )
                    }
                  />

                  <Toggle
                    title="Auto Publish Results"
                    description="Automatically make quiz results available after submission."
                    checked={
                      formData.autoPublishResults
                    }
                    onChange={(value) =>
                      updateField(
                        "autoPublishResults",
                        value
                      )
                    }
                  />

                  <Toggle
                    danger
                    title="Maintenance Mode"
                    description="Temporarily disable student access to the platform."
                    checked={
                      formData.maintenanceMode
                    }
                    onChange={(value) =>
                      updateField(
                        "maintenanceMode",
                        value
                      )
                    }
                  />
                </div>

                <SaveButton
                  saving={saving}
                  onClick={handleSave}
                />
              </SettingsCard>
            )}

            {/* ACCOUNT */}

            {activeTab === "account" && (
              <SettingsCard
                title="Admin Account"
                description="Manage your administrator profile information."
              >
                <div className="mb-7 flex items-center gap-4 rounded-2xl border border-gray-100 bg-gray-50 p-5">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-600 text-xl font-black text-white">
                    {formData.adminName.charAt(
                      0
                    )}
                  </div>

                  <div>
                    <p className="font-black">
                      {formData.adminName}
                    </p>

                    <p className="mt-1 text-sm text-gray-400">
                      Platform Administrator
                    </p>

                    <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-green-50 px-2.5 py-1 text-xs font-bold text-green-600">
                      <CheckCircle2 size={13} />
                      Active
                    </span>
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <InputField
                    label="Admin Name"
                    value={formData.adminName}
                    onChange={(value) =>
                      updateField(
                        "adminName",
                        value
                      )
                    }
                  />

                  <InputField
                    label="Admin Email"
                    type="email"
                    value={formData.adminEmail}
                    onChange={(value) =>
                      updateField(
                        "adminEmail",
                        value
                      )
                    }
                  />
                </div>

                <SaveButton
                  saving={saving}
                  onClick={handleSave}
                />
              </SettingsCard>
            )}

            {/* SECURITY */}

            {activeTab === "security" && (
              <SettingsCard
                title="Security"
                description="Keep your administrator account secure."
              >
                <div className="mb-7 flex gap-4 rounded-2xl border border-green-100 bg-green-50 p-5">
                  <Shield
                    className="shrink-0 text-green-600"
                    size={23}
                  />

                  <div>
                    <p className="font-bold text-green-800">
                      Your account is protected
                    </p>

                    <p className="mt-1 text-sm text-green-700">
                      Use a strong password and
                      keep your administrator
                      credentials private.
                    </p>
                  </div>
                </div>

                <h3 className="text-lg font-black">
                  Change Password
                </h3>

                <p className="mt-1 text-sm text-gray-400">
                  Update your password regularly
                  for better security.
                </p>

                <div className="mt-6 space-y-5">
                  <PasswordInput
                    label="Current Password"
                    value={
                      formData.currentPassword
                    }
                    show={showPassword}
                    onToggle={() =>
                      setShowPassword(
                        (prev) => !prev
                      )
                    }
                    onChange={(value) =>
                      updateField(
                        "currentPassword",
                        value
                      )
                    }
                  />

                  <PasswordInput
                    label="New Password"
                    value={formData.newPassword}
                    show={showPassword}
                    onToggle={() =>
                      setShowPassword(
                        (prev) => !prev
                      )
                    }
                    onChange={(value) =>
                      updateField(
                        "newPassword",
                        value
                      )
                    }
                  />

                  <PasswordInput
                    label="Confirm New Password"
                    value={
                      formData.confirmPassword
                    }
                    show={showPassword}
                    onToggle={() =>
                      setShowPassword(
                        (prev) => !prev
                      )
                    }
                    onChange={(value) =>
                      updateField(
                        "confirmPassword",
                        value
                      )
                    }
                  />
                </div>

                <button
                  onClick={handlePasswordChange}
                  className="mt-7 flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-indigo-700"
                >
                  <Lock size={17} />
                  Update Password
                </button>
              </SettingsCard>
            )}

            {/* NOTIFICATIONS */}

            {activeTab === "notifications" && (
              <SettingsCard
                title="Notifications"
                description="Choose which platform notifications you want to receive."
              >
                <div className="space-y-3">
                  <Toggle
                    icon={<Mail size={18} />}
                    title="Email Notifications"
                    description="Receive important platform updates by email."
                    checked={
                      formData.emailNotifications
                    }
                    onChange={(value) =>
                      updateField(
                        "emailNotifications",
                        value
                      )
                    }
                  />

                  <Toggle
                    icon={<Settings size={18} />}
                    title="Quiz Notifications"
                    description="Get notified when quizzes are created or updated."
                    checked={
                      formData.quizNotifications
                    }
                    onChange={(value) =>
                      updateField(
                        "quizNotifications",
                        value
                      )
                    }
                  />

                  <Toggle
                    icon={<User size={18} />}
                    title="User Notifications"
                    description="Receive notifications about new students and user activity."
                    checked={
                      formData.userNotifications
                    }
                    onChange={(value) =>
                      updateField(
                        "userNotifications",
                        value
                      )
                    }
                  />

                  <Toggle
                    icon={<CheckCircle2 size={18} />}
                    title="Result Notifications"
                    description="Get updates about quiz results and attempts."
                    checked={
                      formData.resultNotifications
                    }
                    onChange={(value) =>
                      updateField(
                        "resultNotifications",
                        value
                      )
                    }
                  />
                </div>

                <SaveButton
                  saving={saving}
                  onClick={handleSave}
                />
              </SettingsCard>
            )}

            {/* APPEARANCE */}

            {activeTab === "appearance" && (
              <SettingsCard
                title="Appearance"
                description="Customize the administrator panel experience."
              >
                <div className="grid gap-6 md:grid-cols-2">
                  <SelectField
                    label="Language"
                    value={formData.language}
                    options={[
                      "English",
                      "Hindi",
                      "Marathi",
                    ]}
                    onChange={(value) =>
                      updateField(
                        "language",
                        value
                      )
                    }
                  />

                  <SelectField
                    label="Timezone"
                    value={formData.timezone}
                    options={[
                      "Asia/Kolkata",
                      "UTC",
                      "America/New_York",
                      "Europe/London",
                    ]}
                    onChange={(value) =>
                      updateField(
                        "timezone",
                        value
                      )
                    }
                  />
                </div>

                <div className="mt-6">
                  <Toggle
                    icon={<Moon size={18} />}
                    title="Dark Mode"
                    description="Use dark theme across the admin dashboard."
                    checked={formData.darkMode}
                    onChange={(value) =>
                      updateField(
                        "darkMode",
                        value
                      )
                    }
                  />
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border-2 border-indigo-500 bg-[#050816] p-5 text-white">
                    <div className="flex items-center gap-3">
                      <Moon size={20} />

                      <span className="font-bold">
                        Dark Theme
                      </span>
                    </div>

                    <p className="mt-3 text-xs text-gray-400">
                      Professional dark interface
                    </p>
                  </div>

                  <div className="rounded-2xl border border-gray-200 bg-white p-5">
                    <div className="flex items-center gap-3">
                      <Globe
                        size={20}
                        className="text-gray-700"
                      />

                      <span className="font-bold">
                        Light Theme
                      </span>
                    </div>

                    <p className="mt-3 text-xs text-gray-400">
                      Clean light interface
                    </p>
                  </div>
                </div>

                <SaveButton
                  saving={saving}
                  onClick={handleSave}
                />
              </SettingsCard>
            )}

            {/* Danger Zone */}

            <div className="mt-6 rounded-2xl border border-red-100 bg-white p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">
                  <AlertTriangle size={21} />
                </div>

                <div className="flex-1">
                  <h3 className="font-black text-red-700">
                    Danger Zone
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    These actions can affect the
                    entire platform. Proceed
                    carefully.
                  </p>

                  <div className="mt-5 flex flex-wrap gap-3">
                    <button
                      onClick={() =>
                        toast.info(
                          "Platform cache cleared."
                        )
                      }
                      className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-bold transition hover:bg-gray-50"
                    >
                      Clear Cache
                    </button>

                    <button
                      onClick={() =>
                        toast.warning(
                          "Database reset is disabled in demo mode."
                        )
                      }
                      className="rounded-xl border border-red-200 px-4 py-2.5 text-sm font-bold text-red-600 transition hover:bg-red-50"
                    >
                      Reset Platform
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

/* =========================================
   SETTINGS TAB
========================================= */

function SettingsTab({
  icon,
  title,
  active,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`mb-1 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold transition ${
        active
          ? "bg-indigo-50 text-indigo-600"
          : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
      }`}
    >
      {icon}
      {title}
    </button>
  );
}

/* =========================================
   SETTINGS CARD
========================================= */

function SettingsCard({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
      <div className="border-b border-gray-100 pb-6">
        <h2 className="text-xl font-black">
          {title}
        </h2>

        <p className="mt-1 text-sm text-gray-400">
          {description}
        </p>
      </div>

      <div className="pt-6">{children}</div>
    </div>
  );
}

/* =========================================
   INPUT
========================================= */

function InputField({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-bold">
        {label}
      </label>

      <input
        type={type}
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:bg-white"
      />
    </div>
  );
}

/* =========================================
   PASSWORD
========================================= */

function PasswordInput({
  label,
  value,
  show,
  onToggle,
  onChange,
}: {
  label: string;
  value: string;
  show: boolean;
  onToggle: () => void;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-bold">
        {label}
      </label>

      <div className="relative">
        <Lock
          size={17}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          type={show ? "text" : "password"}
          value={value}
          onChange={(e) =>
            onChange(e.target.value)
          }
          placeholder="Enter password"
          className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-12 text-sm outline-none transition focus:border-indigo-500 focus:bg-white"
        />

        <button
          type="button"
          onClick={onToggle}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-gray-400 hover:text-gray-700"
        >
          {show ? (
            <EyeOff size={17} />
          ) : (
            <Eye size={17} />
          )}
        </button>
      </div>
    </div>
  );
}

/* =========================================
   SELECT
========================================= */

function SelectField({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-bold">
        {label}
      </label>

      <select
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-indigo-500"
      >
        {options.map((option) => (
          <option key={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

/* =========================================
   TOGGLE
========================================= */

function Toggle({
  title,
  description,
  checked,
  onChange,
  icon,
  danger = false,
}: {
  title: string;
  description: string;
  checked: boolean;
  onChange: (value: boolean) => void;
  icon?: React.ReactNode;
  danger?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-5 rounded-2xl border border-gray-100 bg-gray-50 p-4">
      <div className="flex items-start gap-3">
        {icon && (
          <div className="mt-0.5 text-indigo-600">
            {icon}
          </div>
        )}

        <div>
          <p
            className={`text-sm font-bold ${
              danger && checked
                ? "text-red-600"
                : ""
            }`}
          >
            {title}
          </p>

          <p className="mt-1 text-xs leading-5 text-gray-400">
            {description}
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 shrink-0 rounded-full transition ${
          checked
            ? danger
              ? "bg-red-500"
              : "bg-indigo-600"
            : "bg-gray-300"
        }`}
      >
        <span
          className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow transition ${
            checked
              ? "left-6"
              : "left-1"
          }`}
        />
      </button>
    </div>
  );
}

/* =========================================
   SAVE BUTTON
========================================= */

function SaveButton({
  saving,
  onClick,
}: {
  saving: boolean;
  onClick: () => void;
}) {
  return (
    <div className="mt-7 flex justify-end">
      <button
        onClick={onClick}
        disabled={saving}
        className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-100 transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {saving ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            Saving...
          </>
        ) : (
          <>
            <Save size={17} />
            Save Changes
          </>
        )}
      </button>
    </div>
  );
}
