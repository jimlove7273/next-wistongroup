'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Trash2, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface RMAItem {
  id: string;
  invoiceNumber: string;
  date: string;
  qty: string;
  itemNumber: string;
  serialNumber: string;
  problemDescription: string;
}

const US_STATES = [
  'Alabama',
  'Alaska',
  'Arizona',
  'Arkansas',
  'California',
  'Colorado',
  'Connecticut',
  'Delaware',
  'Florida',
  'Georgia',
  'Hawaii',
  'Idaho',
  'Illinois',
  'Indiana',
  'Iowa',
  'Kansas',
  'Kentucky',
  'Louisiana',
  'Maine',
  'Maryland',
  'Massachusetts',
  'Michigan',
  'Minnesota',
  'Mississippi',
  'Missouri',
  'Montana',
  'Nebraska',
  'Nevada',
  'New Hampshire',
  'New Jersey',
  'New Mexico',
  'New York',
  'North Carolina',
  'North Dakota',
  'Ohio',
  'Oklahoma',
  'Oregon',
  'Pennsylvania',
  'Rhode Island',
  'South Carolina',
  'South Dakota',
  'Tennessee',
  'Texas',
  'Utah',
  'Vermont',
  'Virginia',
  'Washington',
  'West Virginia',
  'Wisconsin',
  'Wyoming',
  'Puerto Rico',
  'U.S. Virgin Islands',
  'American Samoa',
  'Guam',
  'Northern Mariana Islands',
];

const CANADIAN_PROVINCES = [
  'Alberta',
  'British Columbia',
  'Manitoba',
  'New Brunswick',
  'Newfoundland and Labrador',
  'Nova Scotia',
  'Ontario',
  'Prince Edward Island',
  'Quebec',
  'Saskatchewan',
  'Northwest Territories',
  'Nunavut',
  'Yukon Territory',
];

const ALL_REGIONS = [...US_STATES, ...CANADIAN_PROVINCES];

export default function RMAPage() {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [isSending, setIsSending] = useState(false);

  // Step 1 form data
  const [customerId, setCustomerId] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [feedback, setFeedback] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [customerNumber, setCustomerNumber] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [fax, setFax] = useState('');
  const [returnFor, setReturnFor] = useState('replacement');

  // Step 2 form data
  const [rmaItems, setRmaItems] = useState<RMAItem[]>([
    {
      id: '1',
      invoiceNumber: '',
      date: '',
      qty: '',
      itemNumber: '',
      serialNumber: '',
      problemDescription: '',
    },
  ]);

  const handleNext = () => {
    // Validate required fields
    if (
      !companyName ||
      !customerNumber ||
      !address1 ||
      !city ||
      !state ||
      !zipCode ||
      !email ||
      !phone
    ) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in all required fields.',
        variant: 'destructive',
      });
      return;
    }
    setStep(2);
  };

  const handleAddItem = () => {
    setRmaItems([
      ...rmaItems,
      {
        id: Date.now().toString(),
        invoiceNumber: '',
        date: '',
        qty: '',
        itemNumber: '',
        serialNumber: '',
        problemDescription: '',
      },
    ]);
  };

  const handleRemoveItem = (id: string) => {
    if (rmaItems.length > 1) {
      setRmaItems(rmaItems.filter((item) => item.id !== id));
    }
  };

  const handleItemChange = (
    id: string,
    field: keyof RMAItem,
    value: string,
  ) => {
    setRmaItems(
      rmaItems.map((item) =>
        item.id === id ? { ...item, [field]: value } : item,
      ),
    );
  };

  const handleSend = async () => {
    // Validate at least one item has data
    const hasValidItem = rmaItems.some(
      (item) =>
        item.invoiceNumber || item.itemNumber || item.problemDescription,
    );

    if (!hasValidItem) {
      toast({
        title: 'No Items',
        description: 'Please enter at least one RMA item.',
        variant: 'destructive',
      });
      return;
    }

    setIsSending(true);

    try {
      const response = await fetch('/api/rma', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerInfo: {
            customerId,
            emailAddress,
            feedback,
            companyName,
            customerNumber,
            address1,
            address2,
            city,
            state,
            zipCode,
            email,
            phone,
            fax,
            returnFor,
          },
          rmaItems: rmaItems.filter(
            (item) =>
              item.invoiceNumber || item.itemNumber || item.problemDescription,
          ),
        }),
      });

      if (response.ok) {
        toast({
          title: 'Success!',
          description: 'Your RMA request has been submitted successfully.',
        });

        // Reset form
        setStep(1);
        setCustomerId('');
        setEmailAddress('');
        setFeedback('');
        setCompanyName('');
        setCustomerNumber('');
        setAddress1('');
        setAddress2('');
        setCity('');
        setState('');
        setZipCode('');
        setEmail('');
        setPhone('');
        setFax('');
        setReturnFor('replacement');
        setRmaItems([
          {
            id: '1',
            invoiceNumber: '',
            date: '',
            qty: '',
            itemNumber: '',
            serialNumber: '',
            problemDescription: '',
          },
        ]);
      } else {
        throw new Error('Failed to submit RMA request');
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to submit RMA request. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">
          {step === 1 ? 'New RMA Request' : 'RMA Items'}
        </h1>
        <p className="text-muted-foreground">
          {step === 1
            ? 'Please complete the form below to request an RMA'
            : 'Enter the items you wish to return'}
        </p>
      </div>

      {step === 1 ? (
        <>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Customer Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="customerId">Customer ID (optional)</Label>
                  <Input
                    id="customerId"
                    value={customerId}
                    onChange={(e) => setCustomerId(e.target.value)}
                    placeholder="Enter customer ID"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emailAddress">Email Address (optional)</Label>
                  <Input
                    id="emailAddress"
                    type="email"
                    value={emailAddress}
                    onChange={(e) => setEmailAddress(e.target.value)}
                    placeholder="Enter email address"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="feedback">Feedback/Product Suggestions</Label>
                <Textarea
                  id="feedback"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Enter your feedback or product suggestions"
                  rows={3}
                />
              </div>

              <div className="border-t pt-4 mt-4">
                <h3 className="font-semibold mb-4">Contact Details</h3>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="companyName">
                      Company Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="companyName"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="Enter company name"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="customerNumber">
                      Customer Number <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="customerNumber"
                      value={customerNumber}
                      onChange={(e) => setCustomerNumber(e.target.value)}
                      placeholder="Enter customer number"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address1">
                      Address Line 1 <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="address1"
                      value={address1}
                      onChange={(e) => setAddress1(e.target.value)}
                      placeholder="Enter address"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address2">Address Line 2</Label>
                    <Input
                      id="address2"
                      value={address2}
                      onChange={(e) => setAddress2(e.target.value)}
                      placeholder="Apt, suite, unit, building, floor, etc."
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">
                        City <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="Enter city"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="state">
                        State/Province <span className="text-red-500">*</span>
                      </Label>
                      <Select value={state} onValueChange={setState}>
                        <SelectTrigger id="state">
                          <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                        <SelectContent>
                          {ALL_REGIONS.map((region) => (
                            <SelectItem key={region} value={region}>
                              {region}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="zipCode">
                        Zip Code <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="zipCode"
                        value={zipCode}
                        onChange={(e) => setZipCode(e.target.value)}
                        placeholder="Enter zip code"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">
                      Email <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter email"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">
                        Phone Number <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Enter phone number"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="fax">Fax Number</Label>
                      <Input
                        id="fax"
                        type="tel"
                        value={fax}
                        onChange={(e) => setFax(e.target.value)}
                        placeholder="Enter fax number"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>
                      Return For <span className="text-red-500">*</span>
                    </Label>
                    <RadioGroup value={returnFor} onValueChange={setReturnFor}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="credit" id="credit" />
                        <Label htmlFor="credit" className="font-normal">
                          Credit
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="replacement" id="replacement" />
                        <Label htmlFor="replacement" className="font-normal">
                          Replacement
                        </Label>
                      </div>
                    </RadioGroup>
                    {returnFor === 'credit' && (
                      <p className="text-sm text-amber-600 mt-2">
                        If you are returning for credit, please contact your
                        sales rep to get credit approval
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* RMA Policy */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Wiston Group RMA Policy</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none">
              <p className="mb-4">
                Please complete the RMA Request Form above and submit to Wiston
                Group Inc.
              </p>
              <p className="mb-4 font-semibold">
                *No RMA requests by fax will be accepted*
              </p>
              <p className="mb-4">
                If all the information (i.e. invoice #, serial #) is correct, an
                RMA number will be issued within 24 hours. The RMA number you
                are assigned by Wiston Group is for inspection purposes only.
                RMA numbers are effective for only 15 days after they are
                issued. You will receive credit or replacement only under the
                condition that the merchandise was purchased from Wiston Group
                and under the Wiston Group warranty policy and period.
              </p>
              <p className="mb-4">
                All merchandise received by Wiston Group will be inspected and
                tested. All returns will be processed contingent upon test
                results.
              </p>
              <p className="mb-4 font-semibold">
                Note: Any merchandise without proof of purchase and RMA number
                that do not match Wiston Group's database will be returned to
                the customer under customer's own cost.
              </p>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button onClick={handleNext} size="lg">
              Next &gt;
            </Button>
          </div>
        </>
      ) : (
        <>
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>RMA Items</CardTitle>
                <Button onClick={handleAddItem} variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Item
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {rmaItems.map((item, index) => (
                  <div key={item.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold">Item {index + 1}</h3>
                      {rmaItems.length > 1 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveItem(item.id)}
                          className="text-red-600 hover:text-red-800 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`invoice-${item.id}`}>
                          Invoice Number
                        </Label>
                        <Input
                          id={`invoice-${item.id}`}
                          value={item.invoiceNumber}
                          onChange={(e) =>
                            handleItemChange(
                              item.id,
                              'invoiceNumber',
                              e.target.value,
                            )
                          }
                          placeholder="Enter invoice number"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`date-${item.id}`}>Date</Label>
                        <Input
                          id={`date-${item.id}`}
                          type="date"
                          value={item.date}
                          onChange={(e) =>
                            handleItemChange(item.id, 'date', e.target.value)
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`qty-${item.id}`}>Qty</Label>
                        <Input
                          id={`qty-${item.id}`}
                          type="number"
                          min="1"
                          value={item.qty}
                          onChange={(e) =>
                            handleItemChange(item.id, 'qty', e.target.value)
                          }
                          placeholder="Quantity"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`item-${item.id}`}>Item #</Label>
                        <Input
                          id={`item-${item.id}`}
                          value={item.itemNumber}
                          onChange={(e) =>
                            handleItemChange(
                              item.id,
                              'itemNumber',
                              e.target.value,
                            )
                          }
                          placeholder="Enter item number"
                        />
                      </div>

                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor={`serial-${item.id}`}>
                          Serial Number
                        </Label>
                        <Input
                          id={`serial-${item.id}`}
                          value={item.serialNumber}
                          onChange={(e) =>
                            handleItemChange(
                              item.id,
                              'serialNumber',
                              e.target.value,
                            )
                          }
                          placeholder="Enter serial number"
                        />
                      </div>

                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor={`problem-${item.id}`}>
                          Problem Description
                        </Label>
                        <Textarea
                          id={`problem-${item.id}`}
                          value={item.problemDescription}
                          onChange={(e) =>
                            handleItemChange(
                              item.id,
                              'problemDescription',
                              e.target.value,
                            )
                          }
                          placeholder="Describe the problem"
                          rows={3}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-between">
            <Button onClick={() => setStep(1)} variant="outline" size="lg">
              &lt; Back
            </Button>
            <Button onClick={handleSend} size="lg" disabled={isSending}>
              {isSending ? 'Sending...' : 'Send'}
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
