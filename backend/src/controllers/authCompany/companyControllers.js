import Company from "../../models/companyModel/companyModel.js";
export const registerCompany = async (req, res) => {
    try {
        const companyData = req.body;
        // Check required fields are present or not
        if (!companyData.name || !companyData.email || !companyData.hrContact?.name || !companyData.hrContact?.email) {
            return res.status(400).json({
                success: false,
                status: 400,
                message: 'Company name, email, and HR contact name/email are required.',
            });
        }

        const lowerEmail = companyData.email.toLowerCase().trim();
        // company email check if exsists in db
        const existingCompany = await Company.findOne({ email: lowerEmail });
        if (existingCompany) {
            return res.status(409).json({
                success: false,
                status: 409,
                message: 'A company with this email already exists.',
            });
        }

        const newCompany = new Company({
            ...companyData,
            email: lowerEmail,
            hrContact: {
                name: companyData.hrContact.name.trim(),
                email: companyData.hrContact.email.toLowerCase().trim(),
                phone: companyData.hrContact.phone?.trim() || null,
            },
        });

        await newCompany.save();
        return res.status(201).json({
            success: true,
            status: 201,
            message: 'Company registered successfully.',
            data: newCompany,
        });
    } catch (err) {
        if (err.code === 11000) {
            const dupField = Object.keys(err.keyValue)[0];
            return res.status(409).json({
                success: false,
                status: 409,
                message: `Duplicate value for field: ${dupField}`,
            });
        }
        console.error('Register Company Error:', err);
        return res.status(500).json({
            success: false,
            status: 500,
            message: 'Server error while registering company.',
            error: err.message,
        });
    }
}