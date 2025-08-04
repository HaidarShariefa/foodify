import { useState, useEffect } from "react";
import {
  saveSettings,
  fetchSettings,
} from "../../firebase/actions/settingsActions";

export default function Settings() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [facebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [logoFile, setLogoFile] = useState(null);
  const [bannerFile, setBannerFile] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [preview, setPreview] = useState({
    name: "",
    logo: null,
    banner: null,
  });

  useEffect(() => {
    async function loadData() {
      const data = await fetchSettings();
      if (data) {
        setName(data.name || "");
        setAddress(data.address || "");
        setPhone(data.phone || "");
        setEmail(data.email || "");
        setFacebook(data.facebook || "");
        setInstagram(data.instagram || "");
        setWhatsapp(data.whatsapp || "");
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
    setIsSaving(true);

    await saveSettings({
      name,
      address,
      phone,
      email,
      facebook,
      instagram,
      whatsapp,
      logoFile,
      bannerFile,
    });

    setIsSaving(false);
    alert("Settings saved successfully!");

    //refresh data
    const data = await fetchSettings();
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
        Manage Settings
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
          <label className="block text-sm font-medium mb-1">Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Phone Number</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Facebook</label>
          <input
            type="url"
            value={facebook}
            onChange={(e) => setFacebook(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Instagram</label>
          <input
            type="url"
            value={instagram}
            onChange={(e) => setInstagram(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">WhatsApp</label>
          <input
            type="tel"
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
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
          {isSaving ? "Saving..." : "Save Settings"}
        </button>
      </form>
    </div>
  );
}
