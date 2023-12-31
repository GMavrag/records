import { useState } from "react";

export default function RecordForm() {
  const [formData, setFormData] = useState({
    album_name: "",
    band_name: "",
    genre: "",
    year: "",
    price: "",
    photo: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/records", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Handle success (record added)
        alert("Record added successfully!");
        // Reset the form
        setFormData({
          album_name: "",
          band_name: "",
          genre: "",
          year: "",
          price: "",
          photo: "",
          description: "",
        });
      } else {
        // Handle error
        alert("Error adding record.");
      }
    } catch (error) {
      // Handle network error
      console.error("Error:", error);
      alert("Network error. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Input fields for album details */}
      <h4>Album Name: </h4>
      <input
        type="text"
        name="album_name"
        placeholder="Album Name"
        value={formData.album_name}
        onChange={handleChange}
        required
      />
      <h4>Band Name </h4>
      <input
        type="text"
        name="band_name"
        placeholder="Band Name"
        value={formData.band_name}
        onChange={handleChange}
        required
      />
      <h4>Genre: </h4>
      <input
        type="text"
        name="genre"
        placeholder="Genre"
        value={formData.genre}
        onChange={handleChange}
        required
      />
      <h4>Year: </h4>
      <input
        type="number"
        name="year"
        placeholder="Year"
        value={formData.year}
        onChange={handleChange}
        required
      />
      <h4>Price: </h4>
      <input
        type="number"
        name="price"
        placeholder="Price"
        value={formData.price}
        onChange={handleChange}
        required
      />
      <h4>Photo:</h4>
      <h5> (Please be responsible and use photos from wiki..!)</h5>
      <input
        type="text"
        name="photo"
        placeholder="Photo URL"
        value={formData.photo}
        onChange={handleChange}
        required
      />

      {/* Textarea for description */}
      <h4>Description:</h4>
      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        required
      />

      {/* Submit button */}
      <button type="submit">Add Record</button>
    </form>
  );
}
