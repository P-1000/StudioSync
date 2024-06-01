import React from "react";
import { useModal } from "../../context/modalContext"; // Adjust the import path as necessary
import VideoReview from "./VideoReview";

const CreatorDraftComponent = ({ drafts }) => {
  const { openModal } = useModal();

  const handleReview = (draft) => {
    openModal(<VideoReview draft={draft} />, `Quick Review : ${draft.title}`);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Drafts</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-lg">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Created At
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Editor Name
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Draft Title
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300"></th>
            </tr>
          </thead>
          <tbody>
            {drafts.map((draft) => (
              <tr key={draft.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {new Date(draft.created_at).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {draft.editor_username}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {draft.title}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {draft.description}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {draft.status}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                  <button
                    onClick={() => handleReview(draft)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                  >
                    Review
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CreatorDraftComponent;
