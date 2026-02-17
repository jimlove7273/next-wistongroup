import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { customerInfo, rmaItems } = await request.json();

    // Format the email content
    const emailContent = `
RMA REQUEST - Wiston Group
================================

CUSTOMER INFORMATION:
--------------------------------
Customer ID: ${customerInfo.customerId || 'N/A'}
Email Address: ${customerInfo.emailAddress || 'N/A'}
Feedback/Suggestions: ${customerInfo.feedback || 'N/A'}

CONTACT DETAILS:
--------------------------------
Company Name: ${customerInfo.companyName}
Customer Number: ${customerInfo.customerNumber}
Address Line 1: ${customerInfo.address1}
Address Line 2: ${customerInfo.address2 || 'N/A'}
City: ${customerInfo.city}
State/Province: ${customerInfo.state}
Zip Code: ${customerInfo.zipCode}
Email: ${customerInfo.email}
Phone: ${customerInfo.phone}
Fax: ${customerInfo.fax || 'N/A'}
Return For: ${customerInfo.returnFor === 'credit' ? 'Credit' : 'Replacement'}

RMA ITEMS:
--------------------------------
${rmaItems
  .map(
    (item: any, index: number) => `
Item ${index + 1}:
  Invoice Number: ${item.invoiceNumber || 'N/A'}
  Date: ${item.date || 'N/A'}
  Quantity: ${item.qty || 'N/A'}
  Item Number: ${item.itemNumber || 'N/A'}
  Serial Number: ${item.serialNumber || 'N/A'}
  Problem Description: ${item.problemDescription || 'N/A'}
`,
  )
  .join('\n')}

================================
Submitted at: ${new Date().toLocaleString()}
    `.trim();

    // In a real application, you would send this via an email service
    // For now, we'll use a mock implementation
    // You can integrate with services like SendGrid, AWS SES, Resend, etc.

    console.log('RMA Request Received:');
    console.log(emailContent);

    // Mock email sending - replace with actual email service
    const emailSent = await sendEmail({
      to: 'jimlove+wgrma@myehouse.com',
      subject: `RMA Request - ${customerInfo.companyName} (${customerInfo.customerNumber})`,
      body: emailContent,
    });

    if (emailSent) {
      return NextResponse.json(
        { message: 'RMA request submitted successfully' },
        { status: 200 },
      );
    } else {
      throw new Error('Failed to send email');
    }
  } catch (error) {
    console.error('Error processing RMA request:', error);
    return NextResponse.json(
      { error: 'Failed to process RMA request' },
      { status: 500 },
    );
  }
}

// Mock email function - replace with actual email service integration
async function sendEmail({
  to,
  subject,
  body,
}: {
  to: string;
  subject: string;
  body: string;
}) {
  // TODO: Integrate with your email service provider
  // Examples:
  // - SendGrid: https://sendgrid.com/
  // - AWS SES: https://aws.amazon.com/ses/
  // - Resend: https://resend.com/
  // - Nodemailer with SMTP

  console.log(`
    ====== EMAIL WOULD BE SENT ======
    To: ${to}
    Subject: ${subject}
    Body:
    ${body}
    =================================
  `);

  // For now, return true to simulate successful email sending
  // In production, replace this with actual email sending logic
  return true;
}
