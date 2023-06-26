import axios from 'axios';
import cheerio from 'cheerio';
// import { OpenAIApi, Configuration } from 'openai';
import { BingChat } from 'bing-chat';
import pdfjs from 'pdfjs-dist'
import fs from 'fs';

function writeTextToFile(text, filePath) {
    fs.appendFile(filePath, "\n" + text, (err) => {
        if (err) {
            console.error('Error writing file:', err);
        } else {
            console.log('File written successfully!');
        }
    });
}
// OpenAI API configuration
const apiKey = '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'; // Replace with your actual OpenAI API key
const organization = 'org-WIlt6MMawgaCrAdxGHdrroN6';
// const configuration = new openai.Configuration({ apiKey, organization })
// const chatGpt = new openai.OpenAIApi(configuration);

// Function to assess compatibility using ChatGPT API



async function assessCompatibility(cv, criteria) {
    const prompt = `CV:\n${cv}\n\ Đây là những tiêu chí phải thỏa mãn:\n${criteria}\n\n CV này có phù hợp với những tiêu chí đó không? Trả lời có hoặc không. sau đó cho tôi 3 lý do tại sao trả lời như vậy`;

    try {
        const api = new BingChat({
            cookie: "Imported_MUID=02ED765EDE3060043EF4642EDF566170; MUID=074427DFDD7961D8076B35ACDC1F6024; MUIDB=074427DFDD7961D8076B35ACDC1F6024; _EDGE_V=1; SRCHD=AF=WSBEDG; SRCHUID=V=2&GUID=5BA39528AC424225A8DF2C26D48BEF1E&dmnchg=1; MMCASM=ID=7E84E2F9F3CB4284975A54F8461220A6; _tarLang=default=en; _TTSS_IN=hist=WyJmciIsImF1dG8tZGV0ZWN0Il0=; _TTSS_OUT=hist=WyJlbiJd; _clck=elnl28|1|fal|0; ANON=A=1B9CEFCD988BA769F7FB3F2AFFFFFFFF&E=1c32&W=1; PPLState=1; KievRPSSecAuth=FABiBBRaTOJILtFsMkpLVWSG6AN6C/svRwNmAAAEgAAACFfoGyhB74NEIAQ3yvIX/RLbi/TEMqcgjM+VpDTw7WkOaimV5Vfbex8sZWMYgckGjP+JVH4UFHe+s00mCpt9mMRPG/ESP12zxFzLrmeKhP5OJUu5GyEgXYPB7zRty2EMUglrEC3wgoix1L9lObrCvTOW6G+k9usB4WlcepMD+l3LoGWhoHTVJ8qUAbH3UET55Z1KWHcugGaIja6yc+OL6UQcNHrrC6MMSo07S3X4lYXOhYN2Ef6/FX4fW4VOomhMfHAiVEYM0zr2YeGS9PoHvMEIAobHK2Jq9MSQiDr+23O0UEmPmt3GuR4EFeR8jMZ2VL9W8e19+cTtCsUMffRmRWjb70Sh1VwYYTkCEi7PxCrq0wp21WobDEae1IKgTjq/kQEtauuRU0QTHGTml9dAVnjv0xvrh9bCCl2SV45Bj4EwjDydvFdPwua6cy8dkMjY8hGi7Zf482cKrgAB/VADwWtoWLfbrJxOFt3WQQusf+0WNRSX7FDnmgicFZjHma9DkjXU9DjKZTfinx6M7R5bH3mpgdLpXQFxvrdrELDyT4DFWndWP8QUPTT3b0Ur6TzjqFWuO5y+IHe5k/Tn7btRUDbPZoU6sMOaAvYg+gi6TfFcVwo48SPX4uwNTCdxTYw9mLMYQvvMO5NU+UXviXDyLEstKiDG7LGpEl4wsTbuG3TU9T9nXFCZIWwG7qnsZZz6DMhOvsca4ZBnk5tPNfFoFEP89Gfqv2cKe4bWBs/8VAHpAtpp+rAo99iy1WJUoy9WmSm7dR5/rS0cc9EP2VPuujnZMQ/yRRvS4sAMuuOLZl74tN7DO0PQMX4Qc6ABOWjpvyrtQ0vbIteUnI5HssoUR11Ov1+gkfATPdgYyiQvO1n6bnGkMobdOcWI42vz1cXBDCAebN2bXN8lfSejGYbroobUabMdU6JKhLgQXowiJ9x4jAfUTg+zq7BAHyBLy5eBbxLw6k0oIDKINn4aELBmvoWdXLZw8HPwVIRePak2dS7bO4SGNvXz8MXSpWZbl462rKP75gC+v2eLjvcYaGwmsYw15audnBs2nWBqS5bNyXAbXTT8Tr3LdQrFl+koXUhYdX6R9ynoEhcnGCyug7E3z1Wohqk+q6t5Ax/4dDjGMT1jA+qarBTxR4HQBm8VlL87G6fAdoszB+dXRte5WYEH8/iLETJT4KzyPjfp7bpiXLCH3AoZSjFCCSvChCoN9RMCeCCc9u1E7G4O4s4H2rSrdW443dYP0m0uLd4akXZ2uzuDGVDuTqkQFDpsINuKeZO1vztN0o5Mrbwb24mmXe6dxOoUNTN0bbthIOZ2u3khof6nmHspLdjgXX1wCkOSM0tO4nJ+UL/qhwUZlT0Oxex4yQTYsbeAzkxmBfGYmYgMhg5u+Hi7BA4arP2oJVlEBNVACJ7pGoVrm3vV+vwUAEp/+Rc1P1zgP3oXyLtMJmamhDGE; ABDEF=V=13&ABDV=13&MRNB=1684166293370&MRB=0; SUID=A; _EDGE_S=SID=254AE595E7A46B263117F6A9E6B66AFF; WLS=C=7672ba000decce23&N=Tran; _U=1bbabc0lMZ3ng0yVDrIA-SwWcJGZp6tzN9hB0VHMVXIzR9uRhdvRrTkUvFcoaWbGBJc3BlcHhm45SuCJX-cHmvQsDMF7T3czzpfw3KztFKLuIfmjulO-YhycDzM2MhVu6pYXB3ZtaIpdl3Dcg7HYJLfMAENMLNbaMRlxg4Adosip0LoESWS4jXoKPp8rQBcZxoEyijm0aUAn1S5jMGxR-TA; USRLOC=HS=1&ELOC=LAT=10.757139205932617|LON=106.70474243164062|N=Ph%C6%B0%E1%BB%9Dng%204%2C%20Ho%20Chi%20Minh%20City|ELT=2|&CLOC=LAT=10.763544887750019|LON=106.69690450049478|A=733.4464586120832|TS=230626153148|SRC=W; SRCHUSR=DOB=20221207&T=1687795921000; _SS=SID=254AE595E7A46B263117F6A9E6B66AFF&OCID=MY02AA&R=27&RB=27&GB=0&RG=0&RP=24; _RwBf=ilt=10&ihpd=0&ispd=1&rc=27&rb=27&gb=0&rg=0&pc=24&mtu=0&rbb=0.0&g=0&cid=&clo=0&v=1&l=2023-06-26T07:00:00.0000000Z&lft=0001-01-01T00:00:00.0000000&aof=0&o=0&p=DALLE&c=ML25P7&t=3820&s=2023-03-22T16:52:33.2304529+00:00&ts=2023-06-26T16:12:02.7534684+00:00&rwred=0&wls=2&lka=0&lkt=0&TH=&mta=0&e=-7YOTC35mslXZE48OUnLVgxrZgQVqgdfE0igxE5Zk3UiTLZRRoChdwGERAE0hWcY9ajVAmHeqzltD_fPCMaudw&A=&dci=0; dsc=order=News; ipv6=hit=1687799526504&t=4; SRCHHPGUSR=SRCHLANG=en&PV=15.0.0&BRW=NOTP&BRH=M&CW=742&CH=746&SCW=1164&SCH=3187&DPR=1.3&UTC=420&DM=1&EXLTT=1&HV=1687795925"
        })

        const response = await api.sendMessage(prompt)

        const compatibility = isCompatiple(response.text);
        console.log(response.text.split("\n")[0])
        writeTextToFile(response.text.split("\n")[0], "result.txt")

        console.log(response.text.split("\n").slice(1).join("\n"))
        writeTextToFile(response.text.split("\n").slice(1).join("\n"), "result.txt")

        return compatibility;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

function isCompatiple(text) {
    return text.toLowerCase().indexOf("yes") >= 0 ? true : false
}

// Extract PDF link from button HTML
function extractPdfLinkFromButton(buttonHtml) {
    const $ = cheerio.load(buttonHtml);
    const linkElement = $('a.btn.btn-danger');
    const pdfLink = linkElement.attr('href');
    return pdfLink;
}
function getNextLink(buttonHtml) {
    const $ = cheerio.load(buttonHtml);
    const linkElement = $('a.btn.btn-light');
    const fourthButton = linkElement.eq(3);
    const pdfLink = fourthButton.attr('href');
    const isDisabled = fourthButton.hasClass('disabled');
    if (isDisabled) return false;
    return "https://itviec.com" + pdfLink;
}

// Function to download PDF file as a base64-encoded string
async function downloadPdf(url) {
    try {
        const response = await axios.get(url, { responseType: 'arraybuffer' });
        const pdfData = Buffer.from(response.data).toString('base64');
        const text = await convertPdfToText(pdfData);
        return text;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}
async function convertPdfToText(pdfData) {
    try {
        const data = Buffer.from(pdfData, 'base64');
        const loadingTask = pdfjs.getDocument(data);
        const pdf = await loadingTask.promise;
        const totalPageCount = pdf.numPages;
        const textContent = [];

        for (let pageNumber = 1; pageNumber <= totalPageCount; pageNumber++) {
            const page = await pdf.getPage(pageNumber);
            const pageTextContent = await page.getTextContent();
            const pageText = pageTextContent.items.map((item) => item.str).join(' ');
            textContent.push(pageText);
        }

        return textContent.join(' ');
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}
// Main function
const headers = {
    Cookie: 'recent_searches=C%2Fac138JbAuX8I0UdjG3wz9yh6vl8Xn4QH4dSITduOedZ941rsnADmuwt8Y4hAgIl2x9%2B6IW7m%2Fd%2FMN3fCIenqTee%2F7giC4HZBXyyGfc5YmdSpTCD%2F7mZg5wJw%3D%3D--1Qjn%2Be8ojUHICQHn--r%2B7Pp2C0Hmmp45K%2B5GuQ2g%3D%3D; last_city_searched=hE1VQTmpq2naN0XjeswfDJKLzyThqGvF6pUUD%2BwTMhCT%2BxkVEm%2BsB4Y%2BoGJD2pQ%2BcR9HEW7MEgTemm%2Fqg4FCn6WpIxuCMD8rYIkvIOBSv0o8oFiOllxFJxvHD41%2FXA%3D%3D--eSXA7dAkh19etnYC--OlWyH7G0pxpqwrqUQBH8Pg%3D%3D; _gcl_au=1.1.1112427611.1686835887; viewed_jobs=6uiJ8Oftpk909gRg%2BMC3Pi4LgO%2FKCQ1SQIu%2FLA8MUd60P5FBRCBVs9oabO1bmQeU1hSG5ASsEv4WCQhGX9hqDEMtCaIaKdGDBBDRjB3ARQ1EyBAQ%2BNdIdgjfYGJ5lg7yv%2BZl6MDZtIYn4vNn7sB7WMR1Vlw6yHzTf3WkHA%2FJaXdwypSSek9LpXTr8gqS2EUInojivxN42mhiroFJjhrdqXVBja4zh%2Fn9ZEm0X9MGif8rMBsTIQ%3D%3D--FgnR5WMh8173kk9o--YUkBMU1RVvu%2FXgahsSnyfg%3D%3D; _ga=GA1.1.50538038.1686835887; _ga_4Y048XFC1T=GS1.1.1686835887.1.1.1686835939.8.0.0; _ga_H9FSZTPEGR=GS1.1.1686835887.1.1.1686835939.8.0.0; _ITViec_session=8j8I7GT62oUsZDma7Fl0X9LDxoFIPoRWmUqt2HEDmpsKJ4g%2FwotP%2BPWVTs6PFFBXVRyHDsigvhvVTbAALQMae%2BQCvfokaVUwRo63wwCtbtQskyzJCADTEifmw6axF9KMx3laS%2BAIlq8JfDeNpabqETh1FWmqWKumt2FbPiK71URPDZwdUIGqetf6P84rY%2BgKWU4W5XRdGX8UCikaL21CE0A0OkZoYBwhlCXaBfckS1xfsl7PRaftLSEYHhEpUlbbcbE8e1fDXWF%2F5PQZHLZvxpCFKk9FyrWORonidSPNcbRofqGfFPDFbM90gOu93AOfAP6TvThEJZHVlp7YwN8d4CQWPniIB5SzfSWc2TBRoez%2BVazr7WTpQoMcwvnWTU%2Fv2S%2Bal6XZnXdeNZRN3wYaq3%2BKyVpaSTYKyD%2Flzzu5I4IkKPxb9iPWa4OCncrGv7PKMXUMlLoQFI3Sl5viPzj31eXdTyq5eowfyPrfBTkoYo4UOT4K46huwaYU%2F4mLvPmrP2DM2pEc2Ckp21zNCsoUPWOqcFcU5JiUrYgWMGf2RVEA5XyHi0BbhHsnvN2fv%2FRIKmz6nADTLF%2Br3Xbw0hqnJo6ngwtSWHfFWuWvYCH8JhG%2BXxgzI7CaRsBEyRwSxvCD47BiGMMfx0b%2Bz7nt8Vm0z1LemgLi%2B6ELR1lYay8CqCVfymQI0dIXxrwjoqtFIle4RHZyt3LlMglFM0j89062JyoWD8IggmjyRh4nRy3jsF4mnsMr945IELs%3D--qYJ39vIeQRh7v2Co--%2FjwNJubdEaw4BZLGpSPyiw%3D%3D',
};
async function processCV(cvUrl, criteria) {
    try {
        const response = await axios.get(cvUrl, { headers });
        const buttonHtml = response.data;

        const pdfLink = extractPdfLinkFromButton(buttonHtml);
        cvUrl = getNextLink(buttonHtml)
        console.log('PDF Download Link:', pdfLink);
        writeTextToFile(pdfLink, "result.txt")
        const pdfData = await downloadPdf(pdfLink);
        const compatibility = await assessCompatibility(pdfData, criteria);
        return cvUrl;
    } catch (error) {
        console.error('Error:', error);
    }
}
// Example usage
let cvUrl = 'https://itviec.com/customer/job-applications/937f6a0a-d5b3-4b91-b95c-73f47b1a6e76'; // Replace with the actual CV website URL
const compatibilityCriteria = `
-10 năm kinh nghiệm với java và golang
-5 năm kinh nghiệm làm quản lý`;

while (cvUrl) {
    cvUrl = await processCV(cvUrl, compatibilityCriteria);
}
