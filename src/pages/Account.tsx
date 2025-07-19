import UpdatePasswordForm from "@/features/account/update-password-form";
import UpdateUserDataForm from "@/features/account/update-user-data-form";

export default function Account() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <h1 className="text-3xl font-bold">Update Your Account</h1>

      {/* Content Area */}
      <div className="space-y-8">
        {/* First Section */}
        <div className="space-y-4">
          <h3 className="text-xl font-medium">Update User Data</h3>
          <UpdateUserDataForm />
        </div>

        {/* Second Section */}
        <div className="space-y-4">
          <h3 className="text-xl font-medium">Update Password</h3>
          <UpdatePasswordForm />
        </div>
      </div>
    </div>
  );
}
