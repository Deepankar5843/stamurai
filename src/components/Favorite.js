import React, { useState, useEffect } from "react";
import "./Favorite.css";
import ConfirmationCard from "./card/ConfirmationCard";
import CustomAppBar from "./bar/CustomBar";
import Footer from "./bar/Footer";

function Favorite() {
  const [favorites, setFavorites] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedFavorite, setSelectedFavorite] = useState(null);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  const removeFromFavorites = (index) => {
    setSelectedFavorite(index);
    setShowConfirmation(true);
  };

  const confirmRemove = () => {
    const updatedFavorites = [...favorites];
    updatedFavorites.splice(selectedFavorite, 1);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setShowConfirmation(false);
  };

  const cancelRemove = () => {
    setShowConfirmation(false);
  };

  return (
    <>
      <CustomAppBar />
      <div className="favorite-container">
        <h1 className="heading">Favorite Places</h1>
        <div className="favorite-list">
          {favorites.length === 0 ? (
            <p>No favorite locations added yet.</p>
          ) : (
            favorites.map((favorite, index) => (
              <div key={index} className="favorite-item">
                <h2 className="sub-heading">Country</h2>
                <p className="country">{favorite.country}</p>
                <h2 className="sub-heading">City</h2>
                <p className="city">{favorite.name}</p>
                <button onClick={() => removeFromFavorites(index)}>
                  Remove
                </button>
              </div>
            ))
          )}
        </div>

        {showConfirmation && (
          <div className="confirmation-overlay">
            <ConfirmationCard
              message="Are you sure you want to remove this location?"
              onConfirm={confirmRemove}
              onCancel={cancelRemove}
            />
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}

export default Favorite;
