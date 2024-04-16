import { Future } from '@ssephox/katamari';
const readBlobAsText = (blob) => Future.nu((callback) => {
    const fr = new FileReader();
    fr.onload = (e) => {
        const data = e.target ? e.target.result : '';
        callback(data);
    };
    fr.readAsText(blob);
});
export { readBlobAsText };
//# sourceMappingURL=BlobReader.js.map