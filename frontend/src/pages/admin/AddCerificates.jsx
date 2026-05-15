import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const AddCerificates = () => {

    const [colleges, setColleges] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [programmes, setProgrammes] = useState([]);

    const [formData, setFormData] = useState({
        college: '',
        department: '',
        certificateNumber: '',
        surname: '',
        firstname: '',
        lastname: '',
        programme: '',
        award: '',
        graduationDate: ''
    });

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        axios.get('/api/admin/colleges')
            .then(res => setColleges(res.data));
    }, []);

    useEffect(() => {
        if (!formData.college) return;
        axios.get(`/api/admin/departments/${formData.college}`)
            .then(res => setDepartments(res.data));
    }, [formData.college]);

    useEffect(() => {
        if (!formData.department) return;
        axios.get(`/api/admin/programmes/${formData.department}`)
            .then(res => setProgrammes(res.data));
    }, [formData.department]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post('/api/admin/addCertificate', formData, { withCredentials: true });
            toast.success(res.data.message);
            setFormData({
                college: '',
                department: '',
                certificateNumber: '',
                surname: '',
                firstname: '',
                lastname: '',
                programme: '',
                award: '',
                graduationDate: ''
            });
        } catch (err) {
            toast.error(err.response?.data?.message || "Certificate not added!");
            console.log(err)
            setLoading(false)
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 p-6">

            {loading && (<div>Loading</div>)}

            <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-8">

                <h1 className="text-2xl font-bold mb-8">
                    Add Certificate
                </h1>

                <form onSubmit={handleSubmit} className="space-y-8">

                    <div>
                        <label className="block text-gray-700 font-medium mb-2">
                            Certificate Number <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name='certificateNumber'
                            placeholder='e.g. 2345'
                            value={formData.certificateNumber}
                            onChange={handleChange}
                            className="w-full border border-green-300 rounded-lg p-3 focus:outline-none focus:ring-1 focus:ring-green-500"
                        />
                    </div>

                    <div className="bg-gray-50 p-6 rounded-xl border border-green-300">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">
                            Holder's Name
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                            <div>
                                <label className="block text-gray-600 mb-1">
                                    Surname <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name='surname'
                                    value={formData.surname}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-lg focus:outline-1 p-3"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-600 mb-1">
                                    Firstname <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name='firstname'
                                    value={formData.firstname}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-lg focus:outline-1 p-3"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-600 mb-1">
                                    Lastname
                                </label>
                                <input
                                    type="text"
                                    name='lastname'
                                    value={formData.lastname}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-lg  focus:outline-1 p-3"
                                />
                            </div>

                        </div>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-xl border border-green-300">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">
                            Programme of Study <span className="text-red-500">*</span>
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                            <div>
                                <label className="block text-gray-600 mb-1">
                                    College
                                </label>
                                <select
                                    name='college'
                                    className="w-full border border-green-600 rounded px-3 py-2"
                                    onChange={handleChange}
                                >
                                    <option>Select College</option>
                                    {
                                        colleges.map(college => (
                                            <option key={college._id} value={college._id}>
                                                {college.name}
                                            </option>
                                        ))
                                    }
                                </select>
                            </div>

                            <div>
                                <label className="block text-gray-600 mb-1">
                                    Department
                                </label>
                                <select
                                    name='department'
                                    onChange={handleChange}
                                    className='w-full border border-green-600 rounded px-3 py-2'
                                >
                                    <option>Select Department</option>
                                    {
                                        departments.map(department => (
                                            <option key={department._id} value={department._id}>
                                                {department.name}
                                            </option>
                                        ))
                                    }
                                </select>
                            </div>

                            <div>
                                <label className="block text-gray-600 mb-1">
                                    Programme
                                </label>
                                <select
                                    name='programme'
                                    value={formData.programme}
                                    onChange={handleChange}
                                    className='w-full border border-green-600 rounded px-3 py-2'
                                >
                                    <option>Select Programme</option>
                                    {
                                        programmes.map(programme => (
                                            <option key={programme._id} value={programme.name}>
                                                {programme.name}
                                            </option>
                                        ))
                                    }
                                </select>
                            </div>

                        </div>
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-2">
                            Award <span className="text-red-500">*</span>
                        </label>
                        <select
                            name='award'
                            value={formData.award}
                            onChange={handleChange}
                            className="w-full border border-green-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500 p-3"
                        >
                            {formData.programme !== '' ? (

                                formData.programme.startsWith('Bachelor') ? (<>
                                    <option value=''>Select Award</option>
                                    <option>First Class Honours</option>
                                    <option>Second Class Honours (Upper Division)</option>
                                    <option>Second Class Honours (Lower Division)</option>
                                    <option>Pass</option>
                                </>) : (<>
                                    <option value=''>Select Award</option>
                                    <option>Distinction</option>
                                    <option>Credit</option>
                                    <option>Pass</option>
                                </>)

                            ) : (
                                <>
                                    <option>Select Award</option>
                                </>
                            )}

                        </select>
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-2">
                            Graduation Date <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="date"
                            name='graduationDate'
                            onChange={handleChange}
                            value={formData.graduationDate}
                            max={new Date().toISOString().split("T")[0]}
                            className="w-full border border-green-300 rounded-lg p-3 focus:outline-none focus:ring-1 focus:ring-green-500"
                        />
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition"
                        >
                            {!loading ? 'Save Certificate' : 'Saving'}
                        </button>
                    </div>

                </form>

            </div>
        </div>
    );
}

export default AddCerificates