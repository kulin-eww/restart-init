import { CameraIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import RichTextEditor from "./RichTextEditor";
import { useMutation } from "@tanstack/react-query";
import { updateCMSDetailAPI } from "../../api/cms";
import useToast from "../../hooks/useToast";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button, MenuItem, TextField } from "@mui/material";

type EditorProps = {
  title: string;
  cmsContent: any;
  setCmsContent: (e: any) => void;
  action: "view" | "edit";
};

const Editor = ({ title, cmsContent, setCmsContent, action }: EditorProps) => {
  console.log("Virat Kohli", cmsContent);
  const [editMode, setEditMode] = useState(true);
  const [lang, setLang] = useState("en");
  const [editedContent, setEditedContent] = useState<{ en: string; ar: string }>({
    en: cmsContent?.value?.en || "",
    ar: cmsContent?.value?.ar || "",
  });

  useEffect(() => {
    if (cmsContent?.value) {
      setEditedContent({
        en: cmsContent?.value?.en || "",
        ar: cmsContent?.value?.ar || "",
      });
    }
  }, [cmsContent]);

  const [searchParams] = useSearchParams();
  const cmsId = searchParams.get("id");
  const navigate = useNavigate();
  const handleSave = () => {
    setCmsContent({
      show_name: cmsContent?.show_name,
      value: {
        en: editedContent?.en,
        ar: editedContent?.ar,
      },
      id: cmsId,
    });
    mutate({
      show_name: cmsContent?.show_name,
      value: {
        en: editedContent?.en,
        ar: editedContent?.ar,
      },
      id: cmsId,
    });
    navigate(-1);
    setEditMode(false);
  };

  const { mutate, isPending } = useMutation({
    mutationFn: updateCMSDetailAPI,
    onSuccess: (res) => {
      useToast(res.message);
      handleSave();
    },
    onError: (error) => {
      useToast(error.message, "error");
    },
  });

  console.log(editedContent, cmsContent?.[lang]);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
        <h2 className="text-xl font-semibold md:text-2xl">
          {title === "terms_and_conditions"
            ? "Terms and Conditions"
            : title === "about_us"
              ? "About Us"
              : title === "privacy_policy"
                ? "Privacy Policy"
                : ""}
        </h2>
        {/* {action === "edit" && (
          <button
            onClick={() => setEditMode(true)}
            className="flex items-center gap-1 text-sm text-primary hover:underline cursor-pointer"
          >
            <PencilSquareIcon className="h-5 w-5" />
            Edit
          </button>
        )} */}
      </div>
      <div className="flex justify-end items-center w-1/2 mb-4">
        <TextField
          name="locale"
          label="Language"
          value={lang}
          onChange={(e) => setLang(e.target.value)}
          select
          fullWidth
        >
          <MenuItem value="en">English</MenuItem>
          <MenuItem value="ar">Arabic</MenuItem>
        </TextField>
      </div>

      {editMode ? (
        <>
          <RichTextEditor
            value={editedContent?.[lang]}
            onChange={(val) =>
              setEditedContent((prev) => ({
                ...prev,
                [lang]: val, // update only current language
              }))
            }
          />
          {action === "edit" && (
            <div className={`mt-4 flex flex-wrap gap-2`}>
              <Button
                onClick={handleSave}
                type="submit"
                className="flex items-center gap-2 bg-[color:var(--color-primary)] text-white px-4 py-2 rounded-md text-sm disabled:opacity-50 cursor-pointer"
                disabled={isPending}
              >
                Save
              </Button>
              <Button
                onClick={() => {
                  setEditMode(false);
                  setEditedContent(cmsContent || "");
                }}
                className="flex items-center gap-2 bg-gray-600 text-white px-4 py-2 rounded-md text-sm cursor-pointer"
                variant="cancel"
              >
                Cancel
              </Button>
            </div>
          )}
        </>
      ) : cmsContent ? (
        <div className="prose prose-sm sm:prose lg:prose-lg text-gray-800 max-w-none mt-4">
          <div dangerouslySetInnerHTML={{ __html: editedContent?.[lang] }} />
        </div>
      ) : (
        <p className="text-gray-500 italic">No Content available</p>
      )}
    </div>
  );
};

export default Editor;
