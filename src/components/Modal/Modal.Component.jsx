import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
//import { Glogin } from "../../backend/controllers/user-controller";
import { Link } from "react-router-dom";
const CustomModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      // console.log(tokenResponse);

      //const userInfoEndpoint = "https://www.googleapis.com/oauth2/v3/userinfo";
      const userInfoEndpoint = "https://www.googleapis.com/oauth2/v1/userinfo";

      const userInfoResponse = await fetch(userInfoEndpoint, {
        headers: {
          Authorization: `Bearer ${tokenResponse.access_token}`,
        },
      });

      if (userInfoResponse.ok) {
        const userInfo = await userInfoResponse.json();

        console.log(userInfo.name);

        const userObject = {
          given_name: userInfo.given_name,
        };
        const data = { name: "John", email: "30" };
        <Link
          to={`../../backend/controllers/user-controller/${data.name}/${data.email}`}
        ></Link>;
        localStorage.setItem("user", JSON.stringify(userObject));
        navigate("/");
      } else {
        console.error("Failed to fetch user information");
      }
    },
  });

  return (
    <>
      <button
        onClick={openModal}
        className="bg-red-600 text-white px-2 py-1 text-sm rounded"
      >
        {localStorage.getItem("user")
          ? `Hi, ${JSON.parse(localStorage.getItem("user")).given_name}`
          : "Sign In"}
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-screen flex items-center justify-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black/25 backdrop-blur-sm" />
            </Transition.Child>

            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="relative w-full max-w-md p-6 bg-white rounded-lg shadow-xl">
                <button
                  onClick={closeModal}
                  className="absolute top-8 right-6 text-gray-500 hover:text-gray-700"
                >
                  {/* Close button icon */}
                  <svg
                    width="15"
                    height="15"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#666"
                    className="fill-current"
                  >
                    <path d="M13.125 0l-7.5 7.5 7.5 7.5 1.429-1.428L8.482 7.5l6.072-6.071z"></path>
                    <path d="M1.429 0l7.5 7.5-7.5 7.5-1.43-1.428L6.072 7.5 0 1.43z"></path>
                  </svg>
                </button>

                <h2 className="text-2xl font-bold text-center mb-12">
                  Get Started
                </h2>

                {/* Continue with Google */}
                <button
                  onClick={() => {
                    localStorage.clear();
                    googleLogin();
                    closeModal();
                  }}
                  className="border border-gray-300 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded-full w-full mb-4 flex items-center justify-center"
                >
                  <span className="mr-2">
                    {/* Google logo SVG */}
                    <img
                      src="https://in.bmscdn.com/webin/common/icons/googlelogo.svg"
                      alt="Google Logo"
                      className="w-6 h-6"
                    />
                  </span>
                  Continue with Google
                </button>
                {/* Terms & Conditions */}
                <div className="flex items-center justify-center mt-16">
                  <label
                    htmlFor="termsCheckbox"
                    className="text-center text-gray-600 text-sm"
                  >
                    I agree to the{" "}
                    <a
                      href="/terms-and-conditions"
                      target="_blank"
                      className="text-blue-500"
                    >
                      Terms & Conditions
                    </a>{" "}
                    &amp;{" "}
                    <a
                      href="/privacy"
                      target="_blank"
                      className="text-blue-500"
                    >
                      Privacy Policy
                    </a>
                  </label>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default CustomModal;
