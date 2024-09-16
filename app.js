const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');

// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Use CORS middleware
app.use(cors());

// Serve static files (frontend)
app.use(express.static('public'));

// Medical suggestions API
app.post('/api/suggestions', (req, res) => {
    const symptoms = req.body.symptoms;
    const age = req.body.age;
    
    // Example logic to handle symptoms
    let suggestions = [];
    if (symptoms.includes('fever')) {
        if (age >0 && age<=0.3) {
            suggestions.push('Call the doctor, even if your child doesn`t have any other signs or symptoms.');
        } else if (age>0.3&& age<=0.6) {
            suggestions.push('Encourage your child to rest and drink plenty of fluids. Medication isn`t needed. Call the doctor if your child seems unusually irritable, lethargic, or uncomfortable or if temperature is above 102F (38.9C).');
        } else if (age>0.6&& age<=2.0) {
            suggestions.push('Give your child acetaminophen. If your child is age 6 months or older, ibuprofen is OK, too. Read the label carefully for proper dosage. Don`t give aspirin to an infant. Call the doctor if the fever doesn`t respond to the medication or lasts longer than one day.');
        } else if (age>2.0&& age<=17.0) {
            suggestions.push('Encourage your child to rest and drink plenty of fluids. Medication isn`t needed. Call the doctor if your child seems unusually irritable or lethargic, complains of significant discomfort, or if temperature is above 102F (38.9C).');
        } else {
            suggestions.push('Rest and drink plenty of fluids. Medication isn`t needed. Call the doctor if the fever is accompanied by a severe headache, stiff neck, shortness of breath, or other unusual signs or symptoms. If the temperature is above 102F consult a doctor. If the fever persists for more than 3-4 days, make a blood test.');
        }
    }
    if (symptoms.includes('cough')) {
        suggestions.push('Stay hydrated and rest.');
    }

    if (suggestions.length === 0) {
        suggestions.push('No specific suggestions available. Please consult a doctor.');
    }

    res.json({
        symptoms,
        age,
        suggestions
    });
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
