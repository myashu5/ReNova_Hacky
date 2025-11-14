import { motion } from "framer-motion";
import { ExternalLink, MapPin, Heart, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

const Recycle = () => {
  const resellingPlatforms = [
    { name: "eBay", url: "https://www.ebay.com", description: "Global marketplace for electronics" },
    { name: "Swappa", url: "https://swappa.com", description: "Trusted tech marketplace" },
    { name: "Gazelle", url: "https://www.gazelle.com", description: "Buy and sell certified pre-owned devices" },
    { name: "Decluttr", url: "https://www.decluttr.com", description: "Instant valuations and free shipping" },
  ];

  const ngos = [
    { name: "World Computer Exchange", url: "https://worldcomputerexchange.org", description: "Bridging the digital divide" },
    { name: "Computers with Causes", url: "https://computerswithcauses.org", description: "Donate computers to those in need" },
    { name: "National Cristina Foundation", url: "https://cristina.org", description: "Technology for people with disabilities" },
    { name: "The Restart Project", url: "https://therestartproject.org", description: "Fixing electronics together" },
  ];

  return (
    <div className="min-h-screen p-8">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold gradient-text mb-2">Recycle Your Devices</h1>
          <p className="text-muted-foreground">Choose the best option for your e-waste</p>
        </motion.div>

        <div className="space-y-8">
          {/* Reselling Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-panel rounded-2xl p-8 glow-soft"
          >
            <div className="flex items-center space-x-3 mb-6">
              <ShoppingBag className="w-8 h-8 text-accent animate-glow-pulse" />
              <h2 className="text-2xl font-bold gradient-text">Reselling Platforms</h2>
            </div>
            <p className="text-muted-foreground mb-6">
              Give your device a second life by selling it to someone who needs it. These platforms make it easy to resell your electronics safely.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {resellingPlatforms.map((platform, index) => (
                <motion.a
                  key={platform.name}
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="glass-panel rounded-xl p-6 hover:glow-primary transition-all duration-300 group"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-primary group-hover:gradient-text transition-all">
                        {platform.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">{platform.description}</p>
                    </div>
                    <ExternalLink className="w-5 h-5 text-accent flex-shrink-0 group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Donation Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-panel rounded-2xl p-8 glow-soft"
          >
            <div className="flex items-center space-x-3 mb-6">
              <Heart className="w-8 h-8 text-accent animate-glow-pulse" />
              <h2 className="text-2xl font-bold gradient-text">Donate to NGOs</h2>
            </div>
            <p className="text-muted-foreground mb-6">
              Make a difference by donating your devices to organizations that refurbish and distribute them to communities in need.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {ngos.map((ngo, index) => (
                <motion.a
                  key={ngo.name}
                  href={ngo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="glass-panel rounded-xl p-6 hover:glow-accent transition-all duration-300 group"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-primary group-hover:gradient-text-accent transition-all">
                        {ngo.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">{ngo.description}</p>
                    </div>
                    <ExternalLink className="w-5 h-5 text-accent flex-shrink-0 group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Scrap Yards Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-panel rounded-2xl p-8 glow-soft"
          >
            <div className="flex items-center space-x-3 mb-6">
              <MapPin className="w-8 h-8 text-accent animate-glow-pulse" />
              <h2 className="text-2xl font-bold gradient-text">Nearby Scrap Yards</h2>
            </div>
            <p className="text-muted-foreground mb-6">
              Find certified e-waste recycling centers near you. These facilities properly dismantle and recycle electronics to recover valuable materials.
            </p>
            
            {/* Map Placeholder */}
            <div className="glass-panel rounded-xl overflow-hidden h-96 relative group">
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/20 to-accent/20">
                <div className="text-center space-y-4">
                  <MapPin className="w-16 h-16 text-accent mx-auto animate-float" />
                  <p className="text-lg font-semibold gradient-text">Interactive Map</p>
                  <p className="text-sm text-muted-foreground max-w-md">
                    Click below to enable location services and find certified e-waste recycling centers near you
                  </p>
                  <Button className="bg-primary hover:bg-primary/90 glow-primary">
                    Enable Location
                  </Button>
                </div>
              </div>
              {/* This would be replaced with an actual map component like Mapbox or Google Maps */}
            </div>

            <div className="mt-6 grid md:grid-cols-3 gap-4">
              <div className="glass-panel p-4 rounded-lg">
                <h4 className="font-semibold text-accent mb-2">✓ Certified Centers</h4>
                <p className="text-sm text-muted-foreground">EPA-approved recycling facilities</p>
              </div>
              <div className="glass-panel p-4 rounded-lg">
                <h4 className="font-semibold text-accent mb-2">✓ Free Drop-off</h4>
                <p className="text-sm text-muted-foreground">Most centers offer free disposal</p>
              </div>
              <div className="glass-panel p-4 rounded-lg">
                <h4 className="font-semibold text-accent mb-2">✓ Responsible</h4>
                <p className="text-sm text-muted-foreground">Environmentally safe processing</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Recycle;
