import { useState, useEffect } from "react";
import {
  savePeripherals,
  fetchPeripherals,
} from "../../firebase/actions/peripheralsActions";

export default function Peripherals() {
  const [name, setName] = useState("");
  const [logoFile, setLogoFile] = useState(null);
  const [bannerFile, setBannerFile] = useState(null);
  const [isSaving, setIsSaving] = useState(false)
  const [preview, setPreview] = useState({
    name: "",
    logo: null,
    banner: null,
  });

  useEffect(() => {
    async function loadData() {
      const data = await fetchPeripherals();
      if (data) {
        setName(data.name || "");
        setPreview({
          logo: data.logo || null,
          banner: data.banner || null,
        });
      }
    }

    loadData();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setIsSaving(true)

    await savePeripherals({
      name,
      logoFile,
      bannerFile,
    });
    setIsSaving(false)
    alert("Peripherals saved successfully!");

    //refresh data
    const data = await fetchPeripherals();
    if (data) {
      setPreview({
        logo: data.logo || null,
        banner: data.banner || null,
      });
      setLogoFile(null);
      setBannerFile(null);
    }
  }

  return (
    <div className="w-full min-h-screen flex flex-col items-center">
      <h2 className="text-2xl font-bold text-sky-700 text-center my-5">
        Manage Peripherals
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-gray-50 p-4 rounded-lg text-sky-600 shadow-xl/30 border border-sky-600 w-[50rem]"
      >
        <div>
          <label className="block text-sm font-medium mb-1">
            Restaurant Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Logo</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                setLogoFile(file);
                setPreview((prev) => ({
                  ...prev,
                  logo: URL.createObjectURL(file),
                }));
              }
            }}
            className="w-full border px-3 py-2 rounded"
          />
          {preview.logo && (
            <img
              src={preview.logo}
              alt="Logo"
              className="mt-2 w-24 h-24 object-cover rounded"
            />
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Banner</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                setBannerFile(file);
                setPreview((prev) => ({
                  ...prev,
                  banner: URL.createObjectURL(file),
                }));
              }
            }}
            className="w-full border px-3 py-2 rounded"
          />
          {preview.banner && (
            <img
              src={preview.banner}
              alt="Banner"
              className="mt-2 w-full max-h-48 object-cover rounded"
            />
          )}
        </div>

        <button
          type="submit"
          className="bg-sky-600 text-white px-4 py-2 rounded hover:bg-sky-700 transition"
        >
          {isSaving ? 'Saving...' : 'Save Peripherals'}
        </button>
      </form>
    </div>
  );

  //   const [peripherals, setPeripherals] = useState({
  //     name: "",
  //     banner: null,
  //     logo: null,
  //   });
  //   const [preview, setPreview] = useState({
  //     logo: null,
  //     banner: null,
  //   });

  //   useEffect(() => {
  //     async function loadData() {
  //       const data = await fetchPeripherals();
  //       if (data) {
  //         setPeripherals({
  //           name: data.name,
  //           logo: null,
  //           banner: null,
  //         });
  //         setPreview({
  //           logo: data.logo,
  //           banner: data.banner,
  //         });
  //       }
  //     }
  //     loadData();
  //   }, []);

  //   async function handleSubmit(event) {
  //     event.preventDefault();
  //     await savePeripherals({
  //       name: peripherals.name,
  //       logo: peripherals.logo,
  //       banner: peripherals.banner,
  //       logoURL: preview.logo,
  //       bannerURL: preview.banner,
  //     });
  //     alert("Peripherals updated successfully!");
  //   }

  //   return (
  //     <div className="w-full min-h-screen flex flex-col items-center">
  //       <h2 className="text-2xl font-bold text-sky-700 text-center my-5">
  //         Manage Peripherals
  //       </h2>

  //       <div className="space-y-4 bg-gray-50 p-4 rounded-lg text-sky-600 shadow-xl/30 border border-sky-600 w-[50rem]">
  //         <h2 className="text-lg font-medium text-center bg-sky-600 text-gray-50 rounded">
  //           Pick your restaurant peripherals
  //         </h2>

  //         <form onSubmit={handleSubmit}>
  //           <div className="border-y-2 border-gray-400 my-2 py-2">
  //             <label className="block text-sm font-medium mb-1">Restaurant Name</label>
  //             <input
  //               type="text"
  //               value={peripherals.name}
  //               onChange={(e) =>
  //                 setPeripherals((prev) => ({ ...prev, name: e.target.value }))
  //               }
  //               required
  //               className="w-full border border-gray-300 rounded px-3 py-2 placeholder:text-gray mb-2"
  //             />
  //           </div>

  //           <div className="border-b-2 border-gray-400 my-2 pt-2 pb-4">
  //             <label className="block text-sm font-medium mb-1">Logo</label>
  //             <input
  //               type="file"
  //               onChange={(e) => {
  //                 const file = e.target.files[0];
  //                 if (file) {
  //                   setPeripherals((prev) => ({ ...prev, logo: file }));
  //                   setPreview((prev) => ({ ...prev, logo: URL.createObjectURL(file) }));
  //                 }
  //               }}
  //               className="hover:bg-sky-600 hover:text-white px-4 py-2 rounded bg-white text-sky-600 outline hover:outline-sky-600 transition outline-sky-600"
  //             />
  //             {preview.logo && (
  //               <img
  //                 src={preview.logo}
  //                 alt="Logo Preview"
  //                 className="mt-2 w-24 h-24 object-cover rounded"
  //               />
  //             )}
  //           </div>

  //           <div className="border-b-2 border-gray-400 my-2 pt-2 pb-4">
  //             <label className="block text-sm font-medium my-1">Banner</label>
  //             <input
  //               type="file"
  //               onChange={(e) => {
  //                 const file = e.target.files[0];
  //                 if (file) {
  //                   setPeripherals((prev) => ({ ...prev, banner: file }));
  //                   setPreview((prev) => ({ ...prev, banner: URL.createObjectURL(file) }));
  //                 }
  //               }}
  //               className="hover:bg-sky-600 hover:text-white px-4 py-2 rounded bg-white text-sky-600 outline hover:outline-sky-600 transition outline-sky-600"
  //             />
  //             {preview.banner && (
  //               <img
  //                 src={preview.banner}
  //                 alt="Banner Preview"
  //                 className="mt-2 w-24 h-24 object-cover rounded"
  //               />
  //             )}
  //           </div>

  //           <button
  //             type="submit"
  //             className="hover:bg-green-600 hover:text-white px-4 py-2 rounded mt-4 bg-white text-sky-600 outline hover:outline-green-600 transition outline-sky-600"
  //           >
  //             Submit
  //           </button>
  //         </form>
  //       </div>
  //     </div>
  //   );
}
