import toast, { Toaster } from 'react-hot-toast';
const notify = (type, message) => {
    if (type === "success") {
        toast.success(message)
    } else if (toast === "error") {
        toast.error(message);
    }
};

export default notify