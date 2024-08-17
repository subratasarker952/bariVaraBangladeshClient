const Contact = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
      <p className="text-gray-700 mb-4">
        If you have any questions, comments,
        inquiries, feature add/update, please reach out to us using the
        information below.
      </p>
      <div className="mb-4">
        <h2 className="text-2xl font-bold mb-2">Email</h2>
        <p className="text-gray-700">info@houserental.com</p>
      </div>
      <div className="mb-4">
        <h2 className="text-2xl font-bold mb-2">Phone</h2>
        <p className="text-gray-700">+8801521335328 </p>
        <p className="text-gray-700">+8801797433936</p>
      </div>
    </div>
  );
};

export default Contact;
