import React, { useState } from "react";
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import WarningOutlinedIcon from "@mui/icons-material/WarningOutlined";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { useNavigate } from "react-router-dom";
import { useProduct } from "./ProductContext";

const ListProduct = () => {
  const { productList, handleDelete } = useProduct();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const navigate = useNavigate();
  const sortedProductList = [...productList].sort((a, b) => {
    if (sortBy === "id") {
      return sortOrder === "asc" ? a.id - b.id : b.id - a.id;
    } else if (sortBy === "product_name") {
      if (a.product_name < b.product_name) {
        return sortOrder === "asc" ? -1 : 1;
      }
      if (a.product_name > b.product_name) {
        return sortOrder === "asc" ? 1 : -1;
      }
      return 0;
    } else if (sortBy === "status") {
      if (a.status && !b.status) {
        return sortOrder === "asc" ? -1 : 1;
      } else if (!a.status && b.status) {
        return sortOrder === "asc" ? 1 : -1;
      }
      return 0;
    } else if (sortBy === "category_name") {
      if (a.category.category_name < b.category.category_name) {
        return sortOrder === "asc" ? -1 : 1;
      }
      if (a.category.category_name > b.category.category_name) {
        return sortOrder === "asc" ? 1 : -1;
      }
      return 0;
    }
    return 0;
  });

  const handleOpenDeleteDialog = (category) => {
    setCategoryToDelete(category);
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
  };

  const handleDeleteClick = async () => {
    try {
      await handleDelete(categoryToDelete._id);
    } catch (error) {
      console.error("Error deleting category:", error);
    } finally {
      setDeleteDialogOpen(false);
    }
  };

  const handleSort = (property) => {
    if (sortBy === property) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(property);
      setSortOrder("asc");
    }
  };

  return (
    <>
      <TableContainer>
        <Table
          sx={{ minWidth: 650, borderSpacing: "0 8px" }}
          aria-label="simple table"
        >
          <TableHead sx={{ background: "#FFF8B7" }}>
            <TableRow>
              <TableCell align="center" onClick={() => handleSort("id")}>
                <Typography variant="body1" fontWeight="bold">
                  Id{" "}
                  {sortBy === "id" && (
                    <Box component="span" sx={{ verticalAlign: "middle" }}>
                      {sortOrder === "asc" ? (
                        <ArrowDropUpIcon />
                      ) : (
                        <ArrowDropDownIcon />
                      )}
                    </Box>
                  )}
                </Typography>
              </TableCell>
              <TableCell
                align="center"
                onClick={() => handleSort("product_name")}
              >
                <Typography variant="body1" fontWeight="bold">
                  Name{" "}
                  {sortBy === "product_name" && (
                    <Box component="span" sx={{ verticalAlign: "middle" }}>
                      {sortOrder === "asc" ? (
                        <ArrowDropUpIcon />
                      ) : (
                        <ArrowDropDownIcon />
                      )}
                    </Box>
                  )}
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="body1" fontWeight="bold">
                  Pack Size
                </Typography>
              </TableCell>
              <TableCell
                align="center"
                onClick={() => handleSort("category_name")}
              >
                <Typography variant="body1" fontWeight="bold">
                  Category{" "}
                  {sortBy === "category_name" && (
                    <Box component="span" sx={{ verticalAlign: "middle" }}>
                      {sortOrder === "asc" ? (
                        <ArrowDropUpIcon />
                      ) : (
                        <ArrowDropDownIcon />
                      )}
                    </Box>
                  )}
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="body1" fontWeight="bold">
                  MRP
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="body1" fontWeight="bold">
                  Image
                </Typography>
              </TableCell>
              <TableCell align="center" onClick={() => handleSort("status")}>
                <Typography variant="body1" fontWeight="bold">
                  Status{" "}
                  {sortBy === "id" && (
                    <Box component="span" sx={{ verticalAlign: "middle" }}>
                      {sortOrder === "asc" ? (
                        <ArrowDropUpIcon />
                      ) : (
                        <ArrowDropDownIcon />
                      )}
                    </Box>
                  )}
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="body1" fontWeight="bold">
                  Action
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ background: "#F2F2F2" }}>
            {sortedProductList.map((data, index) => (
              <TableRow
                key={index}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
              >
                <TableCell component="th" scope="row" align="center">
                  {data.id}
                </TableCell>
                <TableCell component="th" scope="row" align="center">
                  {data.product_name}
                </TableCell>
                <TableCell component="th" scope="row" align="center">
                  {data.pack_size}
                </TableCell>
                <TableCell component="th" scope="row" align="center">
                  {data.category.category_name}
                </TableCell>
                <TableCell component="th" scope="row" align="center">
                  Rs {data.mrp}
                </TableCell>
                <TableCell component="th" scope="row" align="center">
                  <img
                    src={`http://localhost:4000/${data.product_image}`}
                    alt="Uploaded Image"
                  />
                </TableCell>
                <TableCell component="th" scope="row" align="center">
                  {data.status ? (
                    <Typography sx={{ color: "#2DA323" }}>Active</Typography>
                  ) : (
                    <Typography sx={{ color: "#B13129" }}>Inactive</Typography>
                  )}
                </TableCell>
                <TableCell component="th" scope="row" align="center">
                  <IconButton
                    onClick={() => navigate(`/products-create?id=${data._id}`)}
                  >
                    <EditIcon />
                  </IconButton>
                  {data.status && (
                    <IconButton onClick={() => handleOpenDeleteDialog(data)}>
                      <DeleteIcon />
                    </IconButton>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog
        open={deleteDialogOpen}
        onClose={handleCloseDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <Box
            sx={{
              display: "flex",
              justifyItems: "center",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <WarningOutlinedIcon color="error" /> Delete
          </Box>
        </DialogTitle>
        <DialogContent sx={{ textAlign: "center" }}>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete ?
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center" }}>
          <Button
            variant="outlined"
            sx={{ borderRadius: "50px" }}
            onClick={handleCloseDeleteDialog}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            sx={{ borderRadius: "50px" }}
            onClick={handleDeleteClick}
            autoFocus
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ListProduct;
