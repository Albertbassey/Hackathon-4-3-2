import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { processPayment } from '@/lib/api';
import { authManager } from '@/lib/auth';
import { PaymentData } from '@/lib/types';
import { Crown, Loader2, Check, X } from 'lucide-react';
import { toast } from 'sonner';

interface PaymentModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export default function PaymentModal({ onClose, onSuccess }: PaymentModalProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<'single' | 'monthly'>('single');
  const [phoneNumber, setPhoneNumber] = useState('');

  const plans = {
    single: {
      name: 'Premium Lesson',
      price: 500,
      description: 'Generate one premium lesson plan with advanced features',
      features: ['Curriculum alignment', 'Printable format', 'Advanced activities', 'Assessment rubrics']
    },
    monthly: {
      name: 'Monthly Unlimited',
      price: 3000,
      description: 'Unlimited premium lesson plans for 30 days',
      features: ['Unlimited generation', 'All premium features', 'Priority support', 'Offline access', 'Bulk export']
    }
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    const user = authManager.getAuthState().user;
    
    if (!user) {
      toast.error('Please sign in to make a payment');
      return;
    }

    if (!phoneNumber) {
      toast.error('Please enter your phone number');
      return;
    }

    setIsProcessing(true);

    const paymentData: PaymentData = {
      amount: plans[selectedPlan].price,
      currency: 'NGN',
      email: user.email,
      phone_number: phoneNumber,
      api_ref: `LC_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    };

    try {
      const result = await processPayment(paymentData);
      
      if (result.success) {
        // Upgrade user to premium
        authManager.upgradeToPremium();
        toast.success('Payment successful! You now have premium access.');
        onSuccess();
        onClose();
      } else {
        toast.error(result.error || 'Payment failed. Please try again.');
      }
    } catch (error) {
      toast.error('Payment processing failed. Please try again.');
    }

    setIsProcessing(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Crown className="w-5 h-5 text-yellow-500" />
            <span>Upgrade to Premium</span>
          </CardTitle>
          <CardDescription>
            Unlock advanced features and create better lesson plans
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Plan Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(plans).map(([key, plan]) => (
              <div
                key={key}
                className={`border rounded-lg p-4 cursor-pointer transition-all ${
                  selectedPlan === key
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setSelectedPlan(key as 'single' | 'monthly')}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">{plan.name}</h3>
                  <Badge variant={key === 'monthly' ? 'default' : 'secondary'}>
                    {key === 'monthly' ? 'Best Value' : 'One-time'}
                  </Badge>
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-2">
                  ₦{plan.price.toLocaleString()}
                  {key === 'monthly' && <span className="text-sm font-normal text-gray-600">/month</span>}
                </div>
                <p className="text-sm text-gray-600 mb-3">{plan.description}</p>
                <ul className="space-y-1">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-2 text-sm">
                      <Check className="w-3 h-3 text-green-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Payment Form */}
          <form onSubmit={handlePayment} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="08012345678"
                required
              />
              <p className="text-xs text-gray-500">
                Enter your Nigerian phone number for payment confirmation
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="font-medium">Total Amount:</span>
                <span className="text-xl font-bold">₦{plans[selectedPlan].price.toLocaleString()}</span>
              </div>
              <p className="text-xs text-gray-600 mt-1">
                Payment will be processed via IntaSend secure gateway
              </p>
            </div>

            <div className="flex space-x-2">
              <Button
                type="submit"
                disabled={isProcessing}
                className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing Payment...
                  </>
                ) : (
                  <>
                    <Crown className="mr-2 h-4 w-4" />
                    Pay ₦{plans[selectedPlan].price.toLocaleString()}
                  </>
                )}
              </Button>
              <Button type="button" variant="outline" onClick={onClose}>
                <X className="mr-2 h-4 w-4" />
                Cancel
              </Button>
            </div>
          </form>

          <div className="text-xs text-gray-500 text-center">
            <p>Secure payment powered by IntaSend</p>
            <p>Your payment information is encrypted and secure</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}