import React, { useState } from 'react';
import {
    Button,
    Modal,
    Box,
    Typography,
    TextField,
    FormControl,
    Select,
    MenuItem,
    FormLabel
} from '@mui/material';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

const getDate = () => {
    var currentDate = new Date();
    var day = currentDate.getDate();
    var month = currentDate.getMonth() + 1;
    var year = currentDate.getFullYear();
    return (day + "." + month + "." + year);
};

const FormModal = ({ open, handleClose }) => {
    const [formData, setFormData] = useState({
        // id automatisch und verbergen ist von ELS, creation date automatisch aber anzeigen
        reporter: '',
        category: '',
        description: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        // Handle form submission logic here
        handleClose();

        setFormData({
            reporter: '',
            category: '',
            description: ''
        })
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="form-modal-title"
            aria-describedby="form-modal-description"
        >
            <Box sx={style}>
                <Typography id="form-modal-title" variant="h6" component="h2">
                    Ticket Form
                </Typography>
                <div> Creation Date: {getDate()} </div>

                <form onSubmit={handleSubmit}>

                    <FormControl fullWidth margin="normal">
                        <FormLabel>Reporter</FormLabel>
                        <TextField
                            name="reporter"
                            value={formData.reporter}
                            onChange={handleChange}
                            variant="outlined"
                            required
                        />
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                        <FormLabel>Category</FormLabel>
                        <Select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            variant="outlined"
                            required
                        >
                            <MenuItem value="Auto">Auto</MenuItem>
                            <MenuItem value="Motor">Motor</MenuItem>
                            <MenuItem value="Strom">Strom</MenuItem>
                            <MenuItem value="Lenkung">Lenkung</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                        <FormLabel>Description</FormLabel>
                        <TextField
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            variant="outlined"
                            multiline
                            rows={4}
                            required
                        />
                    </FormControl>
                    <Box mt={2}>
                        <Button type="submit" variant="contained" color="primary">
                            Submit
                        </Button>
                    </Box>
                </form>
            </Box>
        </Modal>
    );
};

export default FormModal;
