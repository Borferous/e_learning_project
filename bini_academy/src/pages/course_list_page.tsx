import { useState } from 'react';
import { Container, Group, TextInput, Badge, Text, Button, Select, Drawer, Stack, Checkbox, RangeSlider, Divider } from "@mantine/core";
import { CourseCard } from "../components/coursecard";
import { HomeHeader } from "../components/homeheader";
import { Footer } from "../components/footer";
import { IconSearch, IconFilter } from "@tabler/icons-react";
import placeholderImg from '../assets/placeholder-image.svg';

export const CourseListPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  
  // Filter states
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [ratingFilter, setRatingFilter] = useState<number | null>(null);
  
  // Calculate active filter count
  const filterCount = 
    (selectedCategories.length > 0 ? 1 : 0) + 
    (priceRange[0] > 0 || priceRange[1] < 5000 ? 1 : 0) + 
    (ratingFilter !== null ? 1 : 0);

  // Static course data
  const allCourses = [
    {
      image: placeholderImg,
      title: "How to Own the Stage: Voice and Movement Techniques",
      category: "ACTING AND THEATER",
      price: "₱5,000",
      priceValue: 5000,
      students: "5.7K",
      rating: 5.0
    },
    {
      image: placeholderImg,
      title: "Mentorship Program for Dance Professionals",
      category: "MENTORSHIP AND CAREER PATHWAYS",
      price: "₱500",
      priceValue: 500,
      students: "5.7K",
      rating: 5.0
    },
    {
      image: placeholderImg,
      title: "Recording Vocals Like a Pro: Techniques for All Genres",
      category: "TECHNICAL SKILLS AND TECHNOLOGY",
      price: "₱500",
      priceValue: 500,
      students: "5.7K",
      rating: 5.0
    },
    {
      image: placeholderImg,
      title: "Audition Like a Star: Tips for Screen Acting Success",
      category: "ACTING AND THEATER",
      price: "₱5,000",
      priceValue: 5000,
      students: "5.7K",
      rating: 5.0
    },
    {
      image: placeholderImg,
      title: "Rondalla Music: Basics of Playing Traditional Filipino Instruments",
      category: "PHILIPPINE ARTS AND HERITAGE",
      price: "₱500",
      priceValue: 500,
      students: "5.7K",
      rating: 5.0
    },
    {
      image: placeholderImg,
      title: "Mastering Vocal Techniques: From Beginner to Pro",
      category: "MUSIC",
      price: "₱5,000",
      priceValue: 5000,
      students: "3.1K",
      rating: 5.0
    },
    {
      image: placeholderImg,
      title: "Certificate in Songwriting and Arranging",
      category: "CERTIFICATION",
      price: "₱5,000",
      priceValue: 5000,
      students: "5.7K",
      rating: 5.0
    },
    {
      image: placeholderImg,
      title: "Hip-Hop Moves for Beginners",
      category: "DANCE",
      price: "₱5,000",
      priceValue: 5000,
      students: "5.7K",
      rating: 5.0
    },
    {
      image: placeholderImg,
      title: "Mentorship Program for Dance Professionals",
      category: "MENTORSHIP AND CAREER PATHWAYS",
      price: "₱500",
      priceValue: 500,
      students: "5.7K",
      rating: 5.0
    },
    {
      image: placeholderImg,
      title: "Mastering Vocal Techniques: From Beginner to Pro",
      category: "MUSIC",
      price: "₱5,000",
      priceValue: 5000,
      students: "3.1K",
      rating: 5.0
    }
  ];

  // Filter and search courses
  const filteredCourses = allCourses.filter(course => {
    // Search query filter
    const matchesSearch = 
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Category filter
    const matchesCategory = 
      selectedCategories.length === 0 || 
      selectedCategories.includes(course.category);
    
    // Price filter
    const matchesPrice = 
      course.priceValue >= priceRange[0] && 
      course.priceValue <= priceRange[1];
    
    // Rating filter
    const matchesRating = 
      ratingFilter === null || 
      course.rating >= ratingFilter;
    
    return matchesSearch && matchesCategory && matchesPrice && matchesRating;
  });

  // Sort courses
  const sortedCourses = [...filteredCourses].sort((a, b) => {
    switch (sortBy) {
      case "Price: Low to High":
        return a.priceValue - b.priceValue;
      case "Price: High to Low":
        return b.priceValue - a.priceValue;
      case "Rating":
        return b.rating - a.rating;
      default: // Trending or any other
        return 0; // Keep original order
    }
  });

  // Categories suggestions
  const suggestions = ["acting", "music", "hiphop dance", "opera", "dj"];
  
  // Available categories for filter (extract unique categories from courses)
  const categories = Array.from(new Set(allCourses.map(course => course.category)));

  // Reset all filters
  const resetFilters = () => {
    setSelectedCategories([]);
    setPriceRange([0, 5000]);
    setRatingFilter(null);
  };

  return (
    <>
      <HomeHeader />
      
      <Container className="py-6">
        {/* Search and Filter Section */}
        <Group align="flex-end" className="mb-6">
          <Button 
            variant="default" 
            leftSection={<IconFilter size={16} />}
            className="border"
            onClick={() => setFilterDrawerOpen(true)}
          >
            Filter
            {filterCount > 0 && (
              <Badge color="orange" size="sm" variant="filled" className="ml-2">
                {filterCount}
              </Badge>
            )}
          </Button>
          
          <TextInput
            className="flex-grow"
            placeholder="Search for courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            leftSection={<IconSearch size={16} />}
            size="md"
          />
          
          <Select
            value={sortBy}
            onChange={(value) => setSortBy(value || "Trending")}
            data={["Trending", "Price: Low to High", "Price: High to Low", "Rating"]}
            label="Sort by:"
            size="md"
            className="w-48"
          />
        </Group>
        
        {/* Suggestions */}
        <Group className="mb-4">
          <Text className="text-gray-600">Suggestion:</Text>
          {suggestions.map((suggestion) => (
            <Badge 
              key={suggestion}
              onClick={() => setSearchQuery(suggestion)}
              className="cursor-pointer"
              color="gray"
              variant="outline"
            >
              {suggestion}
            </Badge>
          ))}
        </Group>
        
        {/* Search Results Count */}
        <Text className="mb-6 text-gray-600">
          <span className="font-bold">{sortedCourses.length}</span> results found for "{searchQuery}"
        </Text>
        
        {/* Course List */}
        {sortedCourses.length === 0 ? (
          <Text className="text-center my-8">No courses match your criteria. Try adjusting your search or filters.</Text>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {sortedCourses.map((course, index) => (
              <CourseCard
                key={index}
                image={course.image}
                title={course.title}
                category={course.category}
                students={course.students} link={''}              />
            ))}
          </div>
        )}
      </Container>
      
      {/* Filter Drawer */}
      <Drawer
        opened={filterDrawerOpen}
        onClose={() => setFilterDrawerOpen(false)}
        title="Filters"
        padding="lg"
        size="sm"
      >
        <Group justify="space-between" mb="md">
          <Text size="lg" fw={700}>Filters</Text>
          <Button variant="subtle" onClick={resetFilters} color="gray">
            Reset All
          </Button>
        </Group>
        
        <Stack gap="lg">
          {/* Category Filter */}
          <div>
            <Text fw={600} className="mb-2">Categories</Text>
            <Stack gap="xs">
              {categories.map((category) => (
                <Checkbox
                  key={category}
                  label={category}
                  checked={selectedCategories.includes(category)}
                  onChange={(e) => {
                    if (e.currentTarget.checked) {
                      setSelectedCategories([...selectedCategories, category]);
                    } else {
                      setSelectedCategories(selectedCategories.filter(c => c !== category));
                    }
                  }}
                />
              ))}
            </Stack>
          </div>
          
          <Divider />
          
          {/* Price Range Filter */}
          <div>
            <Text fw={600} className="mb-4">Price Range</Text>
            <RangeSlider
              min={0}
              max={5000}
              step={100}
              value={priceRange}
              onChange={setPriceRange}
              label={(value) => `₱${value}`}
              minRange={500}
              marks={[
                { value: 0, label: '₱0' },
                { value: 2500, label: '₱2,500' },
                { value: 5000, label: '₱5,000' }
              ]}
            />
          </div>
          
          <Divider />
          
          {/* Rating Filter */}
          <div>
            <Text fw={600} className="mb-2">Rating</Text>
            <Stack gap="xs">
              {[5, 4, 3, 2, 1].map((rating) => (
                <Checkbox
                  key={rating}
                  label={`${rating} stars & up`}
                  checked={ratingFilter === rating}
                  onChange={(e) => {
                    if (e.currentTarget.checked) {
                      setRatingFilter(rating);
                    } else if (ratingFilter === rating) {
                      setRatingFilter(null);
                    }
                  }}
                />
              ))}
            </Stack>
          </div>
        </Stack>
        
        <Button 
          color="orange" 
          onClick={() => setFilterDrawerOpen(false)} 
          fullWidth
          className="mt-8"
        >
          Apply Filters
        </Button>
      </Drawer>
      
      <Footer />
    </>
  );
};