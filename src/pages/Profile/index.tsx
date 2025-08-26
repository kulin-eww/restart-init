import UpdatePassword from "./UpdatePassword";
import UpdateProfile from "./UpdateProfile";

const Profile = () => {
  return (
    <>
      <div className="h-screen overflow-y-auto flex flex-col gap-4">
        <UpdateProfile />
        <UpdatePassword />
      </div>
    </>
  );
};

export default Profile;
