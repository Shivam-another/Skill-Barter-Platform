import { motion } from "framer-motion";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "@/config";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = API_BASE_URL;
export interface User {
  id: number;
  fullName: string;
  profilePic: string;
}

export interface Opp {
  developerOpportunity_id?: number;
  designerOpportunity_id?: number;
  title: string;
  commentCount?: number;
  createdAt: string;
  description: string;
  content: string;
  user: User;
}

interface Props {
  opportunity: Opp;
}

const SubOpportunity = ({ opportunity }: Props) => {
  const { profilePic, fullName } = opportunity.user;
  const {
    createdAt,
    title,
    description,
    commentCount,
    developerOpportunity_id,
    designerOpportunity_id,
  } = opportunity;
  const navigate = useNavigate();

  async function handleDelete() {
    if (developerOpportunity_id) {
      try {
        const response = await axios.delete(
          `/api/authenticatedProfile/developments/${developerOpportunity_id}`,
          {
            withCredentials: true, // Ensure cookies are sent
          },
        );
        if (response.data.success) {
          toast.success("Post Deleted Successfully!");
        }
      } catch (error) {
        console.log("An error occurred while deleting post", error);
        toast.error("An error occurred while deleting post");
      }
    }

    if (designerOpportunity_id) {
      try {
        const response = await axios.delete(
          `/api/authenticatedProfile/designs/${designerOpportunity_id}`,
          {
            withCredentials: true, // Ensure cookies are sent
          },
        );
        if (response.data.success) {
          toast.success("Post Deleted Successfully!");
        }
      } catch (error) {
        console.log("An error occurred while deleting post", error);
        toast.error("An error occurred while deleting post");
      }
    }
  }
  function handleReadMore() {
    if (developerOpportunity_id) {
      navigate(`/developer/${developerOpportunity_id}`);
    } else if (designerOpportunity_id) {
      navigate(`/designer/${designerOpportunity_id}`);
    }
  }

  return (
    <div className="bg-[#232223] rounded-3xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 w-full sm:w-[500px] md:w-[800px] mx-auto my-4">
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img
              src={profilePic}
              alt={fullName}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <h3 className="text-gray-300 font-semibold">{fullName}</h3>
              <p className="text-gray-400 text-sm">Posted on: {createdAt}</p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex">
            {" "}
            <h2 className="text-2xl pr-3 font-bold text-[#e3a428]">{title}</h2>
          </div>
          <p className="text-gray-300 font-serif">{description}</p>
        </div>

        <div className="flex items-center space-x-4 text-gray-400">
          <div className="flex items-center space-x-2">
            <span>{commentCount || 0} comments</span>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleDelete}
            className="pr-3"
            aria-label="Delete Post"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="-0.75 -0.75 16 16"
              stroke="#ffffff"
              aria-hidden="true"
              id="Trash--Streamline-Heroicons-Outline"
              height="27"
              width="27"
            >
              <desc>Trash Streamline Icon: https://streamlinehq.com</desc>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m8.905416666666666 5.4375 -0.20904166666666663 5.4375m-2.89275 0L5.594583333333333 5.4375m6.022333333333333 -1.9393749999999998c0.206625 0.03141666666666666 0.4120416666666667 0.06464583333333333 0.6174583333333333 0.10029166666666667m-0.6174583333333333 -0.0996875L10.971666666666666 11.885770833333332a1.359375 1.359375 0 0 1 -1.35575 1.2548541666666666H4.884083333333333a1.359375 1.359375 0 0 1 -1.35575 -1.2548541666666666L2.8830833333333334 3.498125m8.733833333333333 0a29.065249999999995 29.065249999999995 0 0 0 -2.1012916666666666 -0.23985416666666667m-7.25 0.3395416666666667c0.20541666666666666 -0.03564583333333333 0.41083333333333333 -0.06887499999999999 0.6174583333333333 -0.0996875m0 0a29.06645833333333 29.06645833333333 0 0 1 2.1012916666666666 -0.23985416666666667m4.53125 0v-0.5534166666666667c0 -0.7129166666666665 -0.5497916666666667 -1.3074166666666667 -1.262708333333333 -1.3297708333333333a31.394916666666663 31.394916666666663 0 0 0 -2.005833333333333 0c-0.7129166666666665 0.022354166666666665 -1.262708333333333 0.6174583333333333 -1.262708333333333 1.3297708333333333v0.5534166666666667m4.53125 0a29.402979166666665 29.402979166666665 0 0 0 -4.53125 0"
                strokeWidth="1.5"
              ></path>
            </svg>
          </button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#e3a428] hover:bg-[#c38d22] text-white font-bold py-2 px-6 rounded-full transition-colors duration-300"
            onClick={handleReadMore}
          >
            Details
          </motion.button>
        </div>
      </div>
    </div>
  );
};
export default SubOpportunity;
