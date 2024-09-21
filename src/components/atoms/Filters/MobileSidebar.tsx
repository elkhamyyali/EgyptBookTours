import React from "react";
import {
  Modal,
  Slide,
  Radio,
  Checkbox,
  Slider,
  IconButton,
  Button,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import FilterSection from "./FilterSection";

// Define the types for your props
interface MobileSidebarProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  price: [number, number]; // price is a tuple representing the range
  selectedDestination: string;
  selectedStarRating: string;
  selectedAmenities: string[];
  selectedAccommodationType: string;
  handlePriceChange: (event: Event, newValue: number | number[]) => void;
  handleClearFilters: () => void;
  setSelectedDestination: (destination: string) => void;
  setSelectedStarRating: (rating: string) => void;
  setSelectedAmenities: React.Dispatch<React.SetStateAction<string[]>>;
  setSelectedAccommodationType: (type: string) => void;
}

const MobileSidebar: React.FC<MobileSidebarProps> = ({
  isModalOpen,
  setIsModalOpen,
  price,
  selectedDestination,
  selectedStarRating,
  selectedAmenities,
  selectedAccommodationType,
  handlePriceChange,
  handleClearFilters,
  setSelectedDestination,
  setSelectedStarRating,
  setSelectedAmenities,
  setSelectedAccommodationType,
}) => {
  return (
    <Modal
      open={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      className="flex items-center justify-center md:hidden"
    >
      <Slide direction="up" in={isModalOpen} mountOnEnter unmountOnExit>
        <div className="bg-white w-full h-full p-4 flex flex-col relative">
          {/* Close Button */}
          <IconButton
            onClick={() => setIsModalOpen(false)}
            className="absolute top-2 right-4"
          >
            <CloseIcon fontSize="large" className="text-red-600" />
          </IconButton>

          {/* Filters Header */}
          <div className="flex justify-start gap-x-3 items-center mb-4">
            <h2 className="text-xl font-segoe">Applied filters</h2>
            <Button
              className="text-red-600 hover:text-red-500 font-segoe"
              onClick={handleClearFilters}
            >
              Clear All
            </Button>
          </div>

          {/* Filters Content */}
          <div className="overflow-y-auto flex-grow">
            {/* Destination Filter */}
            <FilterSection title="Destinations" defaultOpen={true}>
              <div className="space-y-2">
                {["Spain", "Italy", "Greece", "Turkey", "Croatia"].map(
                  (country) => (
                    <div key={country} className="flex items-center">
                      <Radio
                        checked={selectedDestination === country}
                        onChange={() => setSelectedDestination(country)}
                        sx={{
                          color: "#9D6C1E",
                          "&.Mui-checked": {
                            color: "#9D6C1E",
                          },
                        }}
                      />
                      <span className="ml-2 font-segoe">{country}</span>
                    </div>
                  )
                )}
              </div>
            </FilterSection>

            {/* Price Filter */}
            <FilterSection title="Price">
              <div className="px-2">
                <Slider
                  value={price}
                  onChange={handlePriceChange}
                  valueLabelDisplay="auto"
                  min={0}
                  max={1000}
                  sx={{
                    color: "#9D6C1E",
                    "& .MuiSlider-thumb": {
                      backgroundColor: "#9D6C1E",
                    },
                    "& .MuiSlider-rail": {
                      backgroundColor: "#9D6C1E",
                    },
                  }}
                />
                <div className="flex justify-between mt-2 font-segoe">
                  <span>${price[0]}</span>
                  <span>${price[1]}</span>
                </div>
              </div>
            </FilterSection>

            {/* Star Rating Filter */}
            <FilterSection title="Star rating">
              <div className="space-y-2">
                {["5 stars", "4 stars", "3 stars", "2 stars", "1 star"].map(
                  (rating) => (
                    <div key={rating} className="flex items-center">
                      <Checkbox
                        checked={selectedStarRating === rating}
                        onChange={() => setSelectedStarRating(rating)}
                        sx={{
                          color: "#9D6C1E",
                          "&.Mui-checked": {
                            color: "#9D6C1E",
                          },
                        }}
                      />
                      <span className="ml-2 font-segoe">{rating}</span>
                    </div>
                  )
                )}
              </div>
            </FilterSection>

            {/* Amenities Filter */}
            <FilterSection title="Amenities">
              <div className="space-y-2">
                {[
                  "Restaurant",
                  "Hotel bar",
                  "Free breakfast",
                  "Room service",
                  "Fitness center",
                ].map((amenity) => (
                  <div key={amenity} className="flex items-center">
                    <Checkbox
                      checked={selectedAmenities.includes(amenity)}
                      onChange={() => {
                        setSelectedAmenities((prev) =>
                          prev.includes(amenity)
                            ? prev.filter((item) => item !== amenity)
                            : [...prev, amenity]
                        );
                      }}
                      sx={{
                        color: "#9D6C1E",
                        "&.Mui-checked": {
                          color: "#9D6C1E",
                        },
                      }}
                    />
                    <span className="ml-2 font-segoe">{amenity}</span>
                  </div>
                ))}
              </div>
            </FilterSection>

            {/* Accommodation Type Filter */}
            <FilterSection title="Accommodation Type">
              <div className="space-y-2">
                {[
                  "Hotel",
                  "Apartment",
                  "Resort",
                  "Villa",
                  "Bed & Breakfast",
                ].map((type) => (
                  <div key={type} className="flex items-center">
                    <Checkbox
                      checked={selectedAccommodationType === type}
                      onChange={() => setSelectedAccommodationType(type)}
                      sx={{
                        color: "#9D6C1E",
                        "&.Mui-checked": {
                          color: "#9D6C1E",
                        },
                      }}
                    />
                    <span className="ml-2 font-segoe">{type}</span>
                  </div>
                ))}
              </div>
            </FilterSection>
          </div>

          {/* Apply Filters Button */}
          <div className="mt-4">
            <button
              onClick={() => setIsModalOpen(false)}
              className="bg-custom-gradient p-3 text-white rounded-md w-full"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </Slide>
    </Modal>
  );
};

export default MobileSidebar;
