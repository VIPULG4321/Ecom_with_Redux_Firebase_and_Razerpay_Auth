import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ✅ Fetch Products from DummyJSON API
export const fetchProducts = createAsyncThunk("search/fetchProducts", async () => {
  const res = await fetch("https://dummyjson.com/products");
  const data = await res.json();
  return data.products; // Returns the array of products
});

const searchSlice = createSlice({
  name: "search",
  initialState: {
    allProducts: [], // Stores original products
    filteredProducts: [], // Stores search results
    searchQuery: "",
    sortOrder: "default", // 'asc', 'desc', or 'default'
    minRating: 0,
    status: "idle",
  },
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
      state.filteredProducts = action.payload
        ? state.allProducts.filter(product =>
            product.title.toLowerCase().includes(action.payload.toLowerCase())
          )
        : state.allProducts; // Reset when search is empty
    },
    setRatingFilter: (state, action) => {
        state.minRating = action.payload;
        state.filteredProducts = state.allProducts.filter(
          product => product.rating >= action.payload
        );
      },
      setSortOrder: (state, action) => {
        state.sortOrder = action.payload;
        if (action.payload === "asc") {
          state.filteredProducts = [...state.filteredProducts].sort((a, b) => a.price - b.price);
        } else if (action.payload === "desc") {
          state.filteredProducts = [...state.filteredProducts].sort((a, b) => b.price - a.price);
        } else {
          state.filteredProducts = state.allProducts;
        }
      },
      applyFilters: (state) => {
        let filtered = state.allProducts.filter(
          product =>
            product.title.toLowerCase().includes(state.searchQuery.toLowerCase()) &&
            product.rating >= state.minRating
        );
  
        if (state.sortOrder === "asc") {
          filtered.sort((a, b) => a.price - b.price);
        } else if (state.sortOrder === "desc") {
          filtered.sort((a, b) => b.price - a.price);
        }
  
        state.filteredProducts = filtered;
      },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.allProducts = action.payload;
        state.filteredProducts = action.payload; // Initially, show all products
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { setSearchQuery, setRatingFilter, setSortOrder, applyFilters } = searchSlice.actions;
export default searchSlice.reducer;