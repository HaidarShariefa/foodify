export default function Banner({banner}) {
  return (
    <div className="p-4">
      {banner && (
        <img
          src={banner}
          alt="Restaurant Banner"
          className="w-full h-100 object-cover rounded-xl shadow-2xl"
        />
      )}
    </div>
  );
}
