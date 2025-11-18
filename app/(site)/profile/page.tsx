'use client';

import { useAuth, type User } from '@/components/auth-provider';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState, useEffect } from 'react';
import { Save, X } from 'lucide-react';

export default function ProfilePage() {
  const { user, logout, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<User>>({
    name: '',
    email: '',
    companyName: '',
    contact: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zipcode: '',
    phone: '',
    fax: '',
  });

  // Update form data when user changes
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        companyName: user.companyName || '',
        contact: user.contact || '',
        address1: user.address1 || '',
        address2: user.address2 || '',
        city: user.city || '',
        state: user.state || '',
        zipcode: user.zipcode || '',
        phone: user.phone || '',
        fax: user.fax || '',
      });
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    updateProfile(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Reset form data to user data
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        companyName: user.companyName || '',
        contact: user.contact || '',
        address1: user.address1 || '',
        address2: user.address2 || '',
        city: user.city || '',
        state: user.state || '',
        zipcode: user.zipcode || '',
        phone: user.phone || '',
        fax: user.fax || '',
      });
    }
    setIsEditing(false);
  };

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">
            Please log in to view your profile
          </h1>
          <Button asChild>
            <a href="/login">Login</a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">User Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <form className="space-y-6">
              {/* Basic Information */}
              <div>
                <h3 className="text-lg font-semibold mb-4">
                  Basic Information
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    {isEditing ? (
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <p className="text-sm text-muted-foreground py-2">
                        {user.name || 'Not provided'}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    {isEditing ? (
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <p className="text-sm text-muted-foreground py-2">
                        {user.email}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Company Information */}
              <div>
                <h3 className="text-lg font-semibold mb-4">
                  Company Information
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name</Label>
                    {isEditing ? (
                      <Input
                        id="companyName"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <p className="text-sm text-muted-foreground py-2">
                        {user.companyName || 'Not provided'}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contact">Contact Person</Label>
                    {isEditing ? (
                      <Input
                        id="contact"
                        name="contact"
                        value={formData.contact}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <p className="text-sm text-muted-foreground py-2">
                        {user.contact || 'Not provided'}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Address Information */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Address</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="address1">Address Line 1</Label>
                    {isEditing ? (
                      <Input
                        id="address1"
                        name="address1"
                        value={formData.address1}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <p className="text-sm text-muted-foreground py-2">
                        {user.address1 || 'Not provided'}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address2">Address Line 2</Label>
                    {isEditing ? (
                      <Input
                        id="address2"
                        name="address2"
                        value={formData.address2}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <p className="text-sm text-muted-foreground py-2">
                        {user.address2 || 'Not provided'}
                      </p>
                    )}
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      {isEditing ? (
                        <Input
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                        />
                      ) : (
                        <p className="text-sm text-muted-foreground py-2">
                          {user.city || 'Not provided'}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="state">State</Label>
                      {isEditing ? (
                        <Input
                          id="state"
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          maxLength={2}
                          placeholder="CA"
                        />
                      ) : (
                        <p className="text-sm text-muted-foreground py-2">
                          {user.state || 'Not provided'}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="zipcode">Zip Code</Label>
                      {isEditing ? (
                        <Input
                          id="zipcode"
                          name="zipcode"
                          value={formData.zipcode}
                          onChange={handleInputChange}
                        />
                      ) : (
                        <p className="text-sm text-muted-foreground py-2">
                          {user.zipcode || 'Not provided'}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <h3 className="text-lg font-semibold mb-4">
                  Contact Information
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    {isEditing ? (
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <p className="text-sm text-muted-foreground py-2">
                        {user.phone || 'Not provided'}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="fax">Fax</Label>
                    {isEditing ? (
                      <Input
                        id="fax"
                        name="fax"
                        type="tel"
                        value={formData.fax}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <p className="text-sm text-muted-foreground py-2">
                        {user.fax || 'Not provided'}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </form>

            <div className="flex gap-4 pt-4 border-t">
              {isEditing ? (
                <>
                  <Button onClick={handleSave}>
                    <Save className="h-4 w-4" />
                    Save Changes
                  </Button>
                  <Button variant="outline" onClick={handleCancel}>
                    <X className="h-4 w-4" />
                    Cancel
                  </Button>
                </>
              ) : (
                <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
              )}
              <Button variant="destructive" onClick={logout}>
                Logout
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
