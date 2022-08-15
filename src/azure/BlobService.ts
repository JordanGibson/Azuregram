import { BlobServiceClient } from '@azure/storage-blob';

export async function uploadFileAsBlob(file: File) {
	const sasUrl =
		'https://imagestoreag.blob.core.windows.net/?sv=2021-06-08&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2099-08-08T23:19:59Z&st=2022-08-08T15:19:59Z&spr=https&sig=WIVorh2qosBJ5tNDLBWBCMAtiIn1uJiOqZsJUDIxEcg%3D';
	const containerName = 'publicimageag';
	const blobServiceClient = new BlobServiceClient(sasUrl);
	const containerClient = blobServiceClient.getContainerClient(containerName);
	const blobName = self.crypto.randomUUID();
	const blockBlobClient = containerClient.getBlockBlobClient(blobName);
	await blockBlobClient.upload(file, file.size);
	return `https://imagestoreag.blob.core.windows.net/publicimageag/${blobName}`;
}
