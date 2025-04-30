
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Mail, MessageSquare, MapPin, Phone, Instagram, Clock, CheckCircle2 } from 'lucide-react';

const Contact = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic would go here
    alert('Message envoyé ! Nous vous répondrons dans les plus brefs délais.');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-natural-50 to-white -z-10"></div>
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-display text-4xl md:text-5xl font-semibold leading-tight mb-6">
              Contactez-nous
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
              Des questions sur nos recherches ? Besoin d'informations supplémentaires ? 
              Notre équipe est là pour vous répondre.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Contact Info */}
            <div className="space-y-8">
              <div className="glass rounded-lg p-6 slide-up">
                <div className="flex space-x-4">
                  <div className="bg-natural-100 rounded-full p-3 flex-shrink-0">
                    <MapPin className="h-6 w-6 text-natural-700" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-medium mb-2">Notre Adresse</h3>
                    <p className="text-muted-foreground">
                      32 Avenue des Sciences<br />
                      75008 Paris, France
                    </p>
                  </div>
                </div>
              </div>

              <div className="glass rounded-lg p-6 slide-up delay-100">
                <div className="flex space-x-4">
                  <div className="bg-natural-100 rounded-full p-3 flex-shrink-0">
                    <Mail className="h-6 w-6 text-natural-700" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-medium mb-2">Email</h3>
                    <p className="text-muted-foreground">
                      <a href="mailto:contact@naturalpure.com" className="hover:text-natural-700 transition-colors">
                        contact@naturalpure.com
                      </a>
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Nous répondons généralement dans les 24-48 heures
                    </p>
                  </div>
                </div>
              </div>

              <div className="glass rounded-lg p-6 slide-up delay-200">
                <div className="flex space-x-4">
                  <div className="bg-natural-100 rounded-full p-3 flex-shrink-0">
                    <Phone className="h-6 w-6 text-natural-700" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-medium mb-2">Téléphone</h3>
                    <p className="text-muted-foreground">
                      <a href="tel:+33123456789" className="hover:text-natural-700 transition-colors">
                        +33 1 23 45 67 89
                      </a>
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Du lundi au vendredi, 9h - 17h
                    </p>
                  </div>
                </div>
              </div>

              <div className="glass rounded-lg p-6 slide-up delay-300">
                <div className="flex space-x-4">
                  <div className="bg-natural-100 rounded-full p-3 flex-shrink-0">
                    <Instagram className="h-6 w-6 text-natural-700" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-medium mb-2">Réseaux Sociaux</h3>
                    <p className="text-muted-foreground">
                      <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-natural-700 transition-colors">
                        @NaturalAndPure
                      </a>
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Suivez-nous pour des conseils et actualités quotidiens
                    </p>
                  </div>
                </div>
              </div>

              <div className="glass rounded-lg p-6 slide-up delay-400">
                <div className="flex space-x-4">
                  <div className="bg-natural-100 rounded-full p-3 flex-shrink-0">
                    <Clock className="h-6 w-6 text-natural-700" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-medium mb-2">Heures d'Ouverture</h3>
                    <ul className="space-y-1 text-muted-foreground">
                      <li className="flex justify-between">
                        <span>Lundi - Vendredi:</span>
                        <span>9h - 17h</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Samedi:</span>
                        <span>Fermé</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Dimanche:</span>
                        <span>Fermé</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="glass rounded-lg p-8 slide-up">
              <div className="mb-8">
                <h2 className="font-display text-2xl font-medium mb-2">Envoyez-nous un message</h2>
                <p className="text-muted-foreground">
                  Remplissez le formulaire ci-dessous et nous vous répondrons dès que possible.
                </p>
              </div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Nom complet
                    </label>
                    <Input 
                      id="name" 
                      placeholder="Votre nom" 
                      required 
                      className="bg-white/50 border-natural-200"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="votre.email@exemple.com" 
                      required 
                      className="bg-white/50 border-natural-200"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">
                    Sujet
                  </label>
                  <Select>
                    <SelectTrigger className="bg-white/50 border-natural-200">
                      <SelectValue placeholder="Sélectionnez un sujet" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="question">Question générale</SelectItem>
                      <SelectItem value="research">Demande de recherche</SelectItem>
                      <SelectItem value="collaboration">Proposition de collaboration</SelectItem>
                      <SelectItem value="media">Demande média</SelectItem>
                      <SelectItem value="other">Autre</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Message
                  </label>
                  <Textarea 
                    id="message" 
                    placeholder="Détaillez votre demande ici..." 
                    rows={5} 
                    required
                    className="bg-white/50 border-natural-200"
                  />
                </div>

                <div className="flex items-start space-x-2">
                  <CheckCircle2 className="h-5 w-5 text-natural-600 mt-0.5" />
                  <p className="text-xs text-muted-foreground">
                    En soumettant ce formulaire, vous acceptez que nous utilisions vos informations pour vous répondre.
                    Nous ne partagerons jamais vos données avec des tiers. 
                  </p>
                </div>

                <Button 
                  type="submit"
                  className="w-full bg-gradient-to-r from-natural-500 to-natural-600 hover:from-natural-600 hover:to-natural-700"
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Envoyer le message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-natural-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="font-display text-3xl font-medium mb-4">Nous Trouver</h2>
            <p className="text-muted-foreground">
              Notre laboratoire est situé au cœur de Paris, facilement accessible en transports en commun.
            </p>
          </div>
          <div className="overflow-hidden rounded-xl glass">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.142047342147!2d2.2922926156743947!3d48.87456857928884!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66fc493300299%3A0xb41d6558382a554!2sArc%20de%20Triomphe!5e0!3m2!1sen!2sfr!4v1653498221684!5m2!1sen!2sfr" 
              width="100%" 
              height="500" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Carte de notre localisation"
            ></iframe>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl font-medium mb-4">Questions Fréquentes</h2>
              <p className="text-muted-foreground">
                Trouvez rapidement des réponses aux questions les plus courantes.
              </p>
            </div>
            <div className="space-y-6">
              <div className="glass rounded-lg p-6 slide-up">
                <h3 className="font-display text-lg font-medium mb-2">Proposez-vous des consultations individuelles ?</h3>
                <p className="text-muted-foreground">
                  Actuellement, nous nous concentrons sur la recherche et la vulgarisation scientifique. Nous ne proposons 
                  pas de consultations individuelles, mais notre contenu vise à vous fournir des informations fiables pour 
                  vous aider dans vos décisions de santé.
                </p>
              </div>
              <div className="glass rounded-lg p-6 slide-up delay-100">
                <h3 className="font-display text-lg font-medium mb-2">Comment puis-je collaborer avec Natural&Pure ?</h3>
                <p className="text-muted-foreground">
                  Nous sommes ouverts aux collaborations avec des chercheurs, des professionnels de la santé et des 
                  entreprises partageant nos valeurs. Contactez-nous via notre formulaire en précisant la nature de la 
                  collaboration que vous envisagez.
                </p>
              </div>
              <div className="glass rounded-lg p-6 slide-up delay-200">
                <h3 className="font-display text-lg font-medium mb-2">Vendez-vous des produits ou compléments alimentaires ?</h3>
                <p className="text-muted-foreground">
                  Non, nous sommes un laboratoire de recherche indépendant et ne vendons aucun produit. Notre mission est 
                  uniquement éducative, visant à vous fournir des informations objectives et scientifiquement validées.
                </p>
              </div>
              <div className="glass rounded-lg p-6 slide-up delay-300">
                <h3 className="font-display text-lg font-medium mb-2">Quand sera lancée votre application mobile ?</h3>
                <p className="text-muted-foreground">
                  Notre application est actuellement en développement. Pour être informé de son lancement, suivez-nous sur 
                  Instagram ou inscrivez-vous à notre newsletter depuis la page d'accueil.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
