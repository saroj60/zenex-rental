const fs = require('fs');

const targetPath = 'src/pages/admin/AddVehicle.jsx';
let content = fs.readFileSync(targetPath, 'utf8');

// Change image input to file
const imgInputTarget = `<div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Image URL</label>
              <input 
                type="text" 
                name="img"
                value={formData.img}
                onChange={handleChange}
                placeholder="e.g. /images/suv_car.png or https://example.com/car.jpg" 
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#e53a24]/50 outline-none"
              />
            </div>`;

const fileInputReplacement = `<div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Vehicle Image</label>
              <input 
                type="file" 
                name="image"
                accept="image/*"
                onChange={(e) => setFile(e.target.files[0])}
                className="w-full border border-gray-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-[#e53a24]/50 outline-none"
              />
            </div>`;

content = content.replace(imgInputTarget, fileInputReplacement);

// Add file state
content = content.replace('const [formData, setFormData] = useState({', 'const [file, setFile] = useState(null);\n  const [formData, setFormData] = useState({');

// Change handleSubmit to use FormData
const handleSubmitTarget = `  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Process features into an array
    const processedFeatures = formData.features.split(',').map(f => f.trim()).filter(f => f);
    
    const newVehicle = {
      ...formData,
      price: parseFloat(formData.price) || 0,
      pax: parseInt(formData.pax) || 0,
      luggage: parseInt(formData.luggage) || 0,
      rating: parseFloat(formData.rating) || 5,
      features: processedFeatures,
      priceWithDriver: formData.priceWithDriver ? parseFloat(formData.priceWithDriver) : 0,
      tax: formData.tax ? parseFloat(formData.tax) : 0
    };

    addVehicle(newVehicle);
    navigate('/admin/vehicles');
  };`;

const formDataReplacement = `  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Process features into an array
    const processedFeatures = formData.features.split(',').map(f => f.trim()).filter(f => f);
    
    const data = new FormData();
    data.append('name', formData.name);
    data.append('type', formData.type);
    data.append('price', parseFloat(formData.price) || 0);
    data.append('pax', parseInt(formData.pax) || 0);
    data.append('trans', formData.trans);
    data.append('fuel', formData.fuel);
    data.append('luggage', parseInt(formData.luggage) || 0);
    data.append('rating', parseFloat(formData.rating) || 5);
    data.append('urgency', formData.urgency);
    data.append('description', formData.description);
    data.append('features', JSON.stringify(processedFeatures));
    data.append('driverIncluded', formData.driverIncluded);
    data.append('priceWithDriver', formData.priceWithDriver ? parseFloat(formData.priceWithDriver) : 0);
    data.append('tax', formData.tax ? parseFloat(formData.tax) : 0);
    
    if (file) {
      data.append('images', file);
    }

    addVehicle(data);
    navigate('/admin/vehicles');
  };`;

content = content.replace(handleSubmitTarget, formDataReplacement);

fs.writeFileSync(targetPath, content, 'utf8');
console.log('done');
