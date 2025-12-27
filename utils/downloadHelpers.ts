// Now let me provide the utility functions file for downloads:

// ## File 2: `~/utils/downloadHelpers.ts`
// ```typescript
export interface DownloadData {
    [key: string]: any;
}

// /**
//  * Convert array of objects to CSV string
//  */
export const convertToCSV = (data: DownloadData[], headers: string[]): string => {
    if (!data || data.length === 0) return '';

    const csvRows: string[] = [];

    // Add headers
    csvRows.push(headers.join(','));

    // Add data rows
    for (const row of data) {
        const values = headers.map(header => {
            const value = row[header];
            // Handle values with commas, quotes, or newlines
            if (value === null || value === undefined) return '';
            const stringValue = String(value);
            // Escape quotes and wrap in quotes if necessary
            if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
                return `"${stringValue.replace(/"/g, '""')}"`;
            }
            return stringValue;
        });
        csvRows.push(values.join(','));
    }

    return csvRows.join('\n');
};

// /**
//  * Download data as CSV file
//  */
export const downloadAsCSV = (data: DownloadData[], filename: string, headers: string[]) => {
    try {
        const csvContent = convertToCSV(data, headers);
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);

        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Clean up the URL
        URL.revokeObjectURL(url);

        return true;
    } catch (error) {
        console.error('Error downloading CSV:', error);
        return false;
    }
};

/**
 * Download data as Excel file
 */
export const downloadAsExcel = (data: DownloadData[], filename: string, headers: string[]) => {
    try {
        // Create HTML table structure that Excel can read
        let excelContent = `
      <html xmlns:o="urn:schemas-microsoft-com:office:office"
            xmlns:x="urn:schemas-microsoft-com:office:excel"
            xmlns="http://www.w3.org/TR/REC-html40">
      <head>
        <meta charset="utf-8">
        <!--[if gte mso 9]>
        <xml>
          <x:ExcelWorkbook>
            <x:ExcelWorksheets>
              <x:ExcelWorksheet>
                <x:Name>Sheet1</x:Name>
                <x:WorksheetOptions>
                  <x:DisplayGridlines/>
                </x:WorksheetOptions>
              </x:ExcelWorksheet>
            </x:ExcelWorksheets>
          </x:ExcelWorkbook>
        </xml>
        <![endif]-->
        <style>
          table { border-collapse: collapse; width: 100%; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          th { background-color: #4CAF50; color: white; font-weight: bold; }
        </style>
      </head>
      <body>
        <table>
          <thead>
            <tr>
    `;

        // Add headers
        headers.forEach(header => {
            excelContent += `<th>${escapeHtml(header)}</th>`;
        });

        excelContent += `
            </tr>
          </thead>
          <tbody>
    `;

        // Add data rows
        data.forEach(row => {
            excelContent += '<tr>';
            headers.forEach(header => {
                const value = row[header];
                excelContent += `<td>${escapeHtml(String(value || ''))}</td>`;
            });
            excelContent += '</tr>';
        });

        excelContent += `
          </tbody>
        </table>
      </body>
      </html>
    `;

        const blob = new Blob([excelContent], { type: 'application/vnd.ms-excel' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);

        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Clean up the URL
        URL.revokeObjectURL(url);

        return true;
    } catch (error) {
        console.error('Error downloading Excel:', error);
        return false;
    }
};

/**
 * Download data as JSON file
 */
export const downloadAsJSON = (data: DownloadData[], filename: string) => {
    try {
        const jsonContent = JSON.stringify(data, null, 2);
        const blob = new Blob([jsonContent], { type: 'application/json' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);

        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Clean up the URL
        URL.revokeObjectURL(url);

        return true;
    } catch (error) {
        console.error('Error downloading JSON:', error);
        return false;
    }
};

/**
 * Helper function to escape HTML special characters
 */
const escapeHtml = (text: string): string => {
    const map: { [key: string]: string } = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
};

/**
 * Format storage location object to string
 */
export const formatStorageLocationForExport = (location: any): string => {
    if (!location) return '';

    const parts = [];
    if (location.site) parts.push(`Site: ${location.site}`);
    if (location.freezer) parts.push(`Freezer: ${location.freezer}`);
    if (location.rack) parts.push(`Rack: ${location.rack}`);
    if (location.box) parts.push(`Box: ${location.box}`);
    if (location.position) parts.push(`Pos: ${location.position}`);

    return parts.join(' | ');
};

