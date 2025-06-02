import axios from "axios";
import { showErrorToast, showConfirmationDialog } from "@/helpers/alert";
import { useAuthStore } from "@/state/pinia";
import { getProgressInstance } from "@/helpers/progress"; // Pastikan helper ini ada
import { JSEncrypt } from 'jsencrypt';
import CryptoJS from 'crypto-js';
// import { key } from '@/key';

export function axiosInterceptors(api) {
    // const privateKey = key.private;
    // const publicKey = key.public;

    // api.interceptors.request.use(config => {
    //     if (['POST', 'PUT', 'DELETE'].includes(config.method.toUpperCase())) {
    //         let dataString = JSON.stringify(config.data);
    //         if (config.method.toUpperCase() === 'DELETE') {
    //             const id = config.url.split('/').pop();
    //             dataString = JSON.stringify({ id });
    //         }

    //         const signer = new JSEncrypt();
    //         signer.setPrivateKey(privateKey);
    //         const signature = signer.sign(dataString, CryptoJS.SHA256, 'sha256');
    //         config.headers['signature'] = signature;
    //     }
    //     return config;
    // });

    // api.interceptors.response.use(response => {
    //     if (response.headers['signature']) {
    //         const verifier = new JSEncrypt();
    //         verifier.setPublicKey(publicKey);
    //         const valid = verifier.verify(
    //             JSON.stringify(response.data.data),
    //             response.headers['signature'],
    //             CryptoJS.SHA256
    //         );
    //         if (!valid) {
    //             alert('Signature not valid. Data may be tampered.');
    //             throw new Error('Signature verification failed');
    //         }
    //     }
    //     return response;
    // });

    setTimeout(() => { // Pastikan store siap sebelum dipakai
        const auth = useAuthStore();
        const progress = getProgressInstance(); // Ambil instance progress

        axios.interceptors.request.use(config => {
            const token = auth.getToken();

            if (token) {
                config.headers["Authorization"] = `Bearer ${token}`;
            }

            if (!config.headers["Content-Type"]) {
                config.headers["Content-Type"] = "application/json";
            }

            config.headers["Accept"] = "application/json";

            if (progress) progress.start(); // Memulai progress bar

            // Set timeout untuk mendeteksi koneksi lambat (3 detik)
            config.timeout = 3000;

            return config;
        }, error => {
            if (progress) progress.fail(); // Jika error, progress merah
            showErrorToast("Request Error", "Terjadi kesalahan pada request");
            return Promise.reject(error);
        });

        axios.interceptors.response.use(response => {
            if (progress) progress.finish(); // Selesaikan progress jika sukses
            return response;
        }, async error => {
            if (progress) progress.fail(); // Jika error, progress merah

            if (error.code === "ECONNABORTED") {
                showErrorToast("Request Time Out", "Jaringan lambat, coba lagi.");
            } else if (error.response && [403, 401].includes(error.response.status)) {
                const confirmed = await showConfirmationDialog(
                    "Ooops",
                    error.response.data.errors?.[0] || "Terjadi kesalahan pada response"
                );
                if (confirmed) {
                    await auth.logout();
                    window.location.reload();
                }
            } else {
                showErrorToast("Error", "Terjadi kesalahan pada response");
            }

            return Promise.reject(error);
        });

    }, 100); // Delay untuk memastikan Pinia siap
}
