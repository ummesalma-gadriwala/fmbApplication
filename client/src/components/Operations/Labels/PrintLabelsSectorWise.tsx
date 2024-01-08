import { inflateSync } from "zlib";
import './PrintLabelsSectorWise.css';

export const generatePrintableLabels = (overrideDetails) => {
    let tableRows = ''; // Initialize an empty string to store table rows

    // Loop through each sector in overrideDetails and create table rows
    Object.keys(overrideDetails).forEach((key, index) => {
        const sector = overrideDetails[key];

        // Check the value of sector.count
        const count = parseInt(sector.count); // Convert count to an integer

        if (count === 0) {
            // If count is 0, don't print the label
            return; // Skip this iteration
        } else {
            // Determine the color based on packageType
            let color = '';
            let rowStyle = ''; // Inline style for table row
            let cellStyle = ''; // Inline style for table cell


            // Determine CSS classes based on index (row number)
            if (index === 0) {
                rowStyle = 'font-weight: bold; font-size: 30px;'; // Apply bold and font size 30 to first row
            } else if (index === 1) {
                rowStyle = 'font-size: 30px;'; // Apply font size 30 to second row
            } else {
                rowStyle = 'font-size: 10px;'; // Apply font size 10 to other rows
            }

            if (sector.packageType === 'Medium') {
                color = 'WHITE';
            } else if (sector.packageType === 'Regular') {
                color = 'GREY';
            } else if (sector.packageType === 'Single') {
                color = 'SINGLE';
            } else {
                // Handle other packageType values if needed
                color = 'UNKNOWN'; // Default value for unknown types
            }

            // If count is 1 or greater, print the label based on the count value
            for (let i = 0; i < count; i++) {
                // Create a table row with table cells for each detail
                tableRows += `
                <div style="width: 100%;height:62mm;margin: 0;page-break-after: always">
                    <table border="1" cellpadding="0" cellspacing="0" width="100%" height="100%">
                        <tbody>
                            <tr style="font-size: 30px;font-weight: bold;">
                                <td COLSPAN=2 align="center" >${sector.subscriberId}</td>
                            </tr>
                            <tr style="font-size: 30px;font-weight: bold;">
                                <td COLSPAN=2 align="center">${sector.firstName} ${sector.lastName}</td>
                            </tr>
                            <tr style="font-size: 10px;">
                                <td align="center"> ${sector.sector}</td>
                                <td align="center">${color}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                `;
            }
        }
    });
    // Create the complete HTML table with headers and rows
    const table = `
                ${tableRows} <!-- Insert generated table rows -->
  
    `;

    return table; // Return the complete HTML table
};

export const handlePrint = (overrideDetails) => {
    const printableLabels = generatePrintableLabels(overrideDetails);
    const printWindow = window.open('', '_blank');
    if (printWindow) {
        printWindow.document.open();
        printWindow.document.write(`
        <html>
        <head>
          <title>A4 Page Using CSS</title>
          <style>
           body {
             width: 100mm;
             margin: 0 auto;
             padding: 0;
             font-size: 12pt;
             background: rgb(204,204,204); 
           }
           * {
             box-sizing: border-box;
             -moz-box-sizing: border-box;
           }
           .main-page {
             width: 100mm;
             margin: 0mm auto;
             background: white;
             box-shadow: 0 0 0.5cm rgba(0,0,0,0.5);
           }
           .sub-page {
             padding: 1cm;
           }
           @page {
             size: Custom;
             margin: 0;
           }
           @media print {
             html, body {
               width: 100mm;
             }
             .main-page {
               margin: 0;
               page-break-after: always;
             }
           }
        </style>
        </head>
        <body>${printableLabels}</body>
      </html>
        </html>
    `);
        printWindow.document.close();

        //     // Set window options to exclude headers and footers
        //     printWindow.document.title = 'Print Document';
        //     const style = printWindow.document.createElement('style');
        //     style.innerHTML = `
        //     @media print {
        //         @page {
        //             size: 62mm 100mm landscape;
        //             margin: 0;
        //         }
        //         /* Hide headers */
        //         @top-center, @top-left, @top-right {
        //             display: none !important;
        //         }
        //         /* Hide footers */
        //         @bottom-center, @bottom-left, @bottom-right {
        //             display: none !important;
        //         }
        //     }
        // `;
        //     printWindow.document.head.appendChild(style);

        printWindow.focus();

        // Wait for the content to load before printing
        printWindow.print();
        // printWindow.close(); // Close the window after printing

    } else {
        console.log('Could not open new window for printing');
    }

};

