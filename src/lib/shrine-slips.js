// Grand Narukami Shrine fortune slips. Each lucky object appears on exactly one
// slip, so it identifies both the tier and the message.
// `short` is the chip label; `text` is the fortune; `lore` describes the object.
// Source: Genshin Impact Fandom wiki, Fortune Slip (Inazuma).
const raw = [
  [
    "great-fortune",
    "Rare Horsetail",
    "Horsetail",
    `Whenever you draw your blade, it shall lead you towards victory. The shine of your blade as it leaves its sheath will also inspire those around you.
Today, a single shot from your bow will shoot down an airborne prey, and a single strike against a guard will hit their weak spot.
If you have no target, try looking around. You might find a surprise waiting for you.
Also, don't forget to share your good luck with your less-fortunate companions.`,
    `Horsetails grow in fields of Silvergrass, but are much taller.
It is a fitting symbol for you, who stands tall and proud in this world.`,
  ],
  [
    "great-fortune",
    "Energetic Onikabuto",
    "Onikabuto",
    `Today, what was lost will be found.
Efforts you thought were made in vain will bear fruit.
A friendship you once thought broken will be mended.
Something you had long forgotten will come to mind.
Nothing in this world is beyond redemption.
Today is the day to reclaim what was lost.`,
    `The onikabuto is a peace-loving little being that avoids confrontation.
May this pursuit of peace bring you great happiness.`,
  ],
  [
    "great-fortune",
    "Thriving Naku Weed",
    "Naku Weed",
    `Today the wind will pick up, and you will succeed effortlessly in whatever you do.
The people around you will be exceptionally content, and no conflicts will occur.
You will dine on delicacies that you have wished for but not eaten in a long time.
In your work and in your travels, everything will go smoothly.
Seize the day and advance with zeal.`,
    `Many people are unaware that the Naku Weed can predict thunderstorms.
It seeks the gaze of the Electro Archon, growing only on the islands of Inazuma.
The tingling sensation you feel when picking it is said to feel similar to good fortune.`,
  ],
  [
    "great-fortune",
    "Everburning Flaming Flower Stamen",
    "Flower Stamen",
    `The clouds disperse, revealing the moon in the sky. Whoever draws this slip will receive great fortune.
With clarity in your heart, what you wish for will come true.
Things will go your way today, whether there is something you wish to accomplish...
...or someone you wish to meet. Now is the time to act.`,
    `The heat of a Flaming Flower comes from the fire in its heart.
The reason everything will go your way is because your heart knows the path to take.`,
  ],
  [
    "good-fortune",
    "Shining Crystal Core",
    "Crystal Core",
    `A day like any other. A routine that the body and mind are accustomed to.
An item will appear to replace something you lost, which will bring you great happiness.
Relations with the acquaintances you see most frequently will improve, and some may even become the best of friends.
Even the most ordinary of days can become a treasured memory.`,
    `Crystalfies are tiny life-forms born of coalesced elemental energy.
And the elements are blessings promised by the world to the people who inhabit it.`,
  ],
  [
    "good-fortune",
    "Rising Bamboo Shoot",
    "Bamboo Shoot",
    `Spring has come to the withered tree, and many things are coming back to life.
When things get difficult, the solution will come to you.
When you are plagued by uncertainty, a helping hand will arrive.
Clear your mind and tidy your home.
You may find unexpected fortune.`,
    `Bamboo Shoots possess unlimited potential.
No one knows how tall a Bamboo Shoot can truly grow.
The mere sight of it is enough to get you excited about the future.`,
  ],
  [
    "good-fortune",
    "Warm Bird Egg",
    "Bird Egg",
    `A day when nothing especially noteworthy happens — and yet, you cannot help but feel happy.
You will find something you thought was long gone in the nooks and crannies you never noticed before.
Food will taste fresher than usual, and the scenery ahead will appear brighter than ever.
The world is full of new and wonderful things.`,
    `Eggs brim with limitless potential — they are the seeds of the future.
By the same token, think what the world represents to the life inside the egg:
A place filled with unknown and exciting things.
Just make sure to treat the egg gently.`,
  ],
  [
    "modest-fortune",
    "Fresh Mint",
    "Mint",
    `The air pressure is a little low, which makes you think back far into your past.
Memories of your long-lost youth and friends with whom you have lost contact come to mind.
They bring with them a touch of nostalgia, and a hint of sadness.
It is good to remember the past once in a while. May it help calm your mind and face the future.`,
    `Wherever there is vegetation, there is Mint.
In this sense, Mint is the most resilient life-form in the world.
It is said that it even grows amid the snow of Mondstadt's highest mountain.`,
  ],
  [
    "modest-fortune",
    "Luminescent Spine",
    "Spine",
    `Clouds cover half the moon and the fog is thick.
Above you is the moon shrouded by cloud. Ahead of you, everything is engulfed by fog.
Though the way ahead seems unclear at the moment, all will become clear when the time comes.
Take this opportunity to improve yourself while waiting for the clouds to clear.`,
    `The Luminescent Spine shines with a faint glow, but shines strong nonetheless.
Though it may not be the brightest of lights, it is enough to illuminate the road ahead.`,
  ],
  [
    "modest-fortune",
    "Tingling Electro Crystal",
    "Electro Crystal",
    `A calm and serene day. Nothing will happen to make you sad.
Today is a good day to catch up with friends you have not contacted in a long time, to reminisce and to laugh.
When you eat, you will rediscover a flavor from the past that you tried once, long ago.
Cherish the things and people in your life.`,
    `Electro Crystal contains limitless energy.
Find a way to channel this energy and you may achieve great things.`,
  ],
  [
    "modest-fortune",
    "Fallen Pinecone",
    "Pinecone",
    `The clouds hang low in the sky, and they will build up further still.
Sooner or later, a thunderstorm will suddenly come crashing down from above.
Yet the rainbow awaits at the end of the storm.
Stick to tried and tested ways and maintain peace. Act rashly, and you may struggle to succeed.`,
    `Not all pinecones can grow into large pine trees.
Growth requires the right environment, but also a little luck.
So don't put too much pressure on yourself. Wait patiently for the rainbow.`,
  ],
  [
    "rising-fortune",
    "Luscious Lavender Melon",
    "Lavender Melon",
    `Days when clouds drift through the sky bring a feeling of great contentment.
Work will go smoothly, and good ideas will come to you, even during your noon nap.
Suddenly, you will find brand new common ground with old friends...
Every day will be positive and filled with cheer.`,
    `People often praise the virtue of being the same on the inside as on the outside.
But the Lavender Melon's extravagant exterior hides a humble sweetness within.`,
  ],
  [
    "rising-fortune",
    "Mature Sea Ganoderma",
    "Sea Ganoderma",
    `The blade that has been tempered for ten years will shine bright today.
Your misfortune is gone and you are rising from the pit of despair.
You've trained hard for years without showing your skill.
But today is the perfect opportunity to showcase your capabilities.
If you encounter obstacles, do not fret.
Draw your sword without fear and fight with all your might.`,
    `The Sea Ganodermite is a weak creature that must endure years of hardship to grow into a Sea Ganoderma.
People who strive toward their goals will surely reap the fruits of their labor.`,
  ],
  [
    "misfortune",
    "Frosty Mist Flower",
    "Mist Flower",
    `Be careful. You may be about to lose something that you treasure.
Remember to rest if you're feeling unwell.
Think twice before you make a decision.`,
    `The Mist Flower gives off a coldness that says: I am unapproachable.
But sometimes, that same cool air can calm one's heart and mind.
This may help you to judge situations correctly, and act wisely.`,
  ],
  [
    "misfortune",
    "Drifting Seagrass",
    "Seagrass",
    `It seems like it will rain today. You may encounter an unpleasant situation.
You will still be waiting for the commendation you are due, and you may be served the wrong dish by the waiting staff.
Nothing terrible happens, but everything seems to irritate you.
It's just one of those days.`,
    `Seagrass is a gentle but tenacious plant.
Despite the bitterness of the seawater around it, it refuses to change.
Hold onto your gentle nature, even when nothing is going your way.`,
  ],
  [
    "great-misfortune",
    "Curly Lizard Tail",
    "Lizard Tail",
    `A day spent feeling empty inside can lead to a profound sense of powerlessness.
The problems you face are defying your attempts to solve them. This futile endeavor is wearing you down and making you ill.
But do not be discouraged that everything is going downhill.
Survive this difficult period and one day you will achieve something great.`,
    `When faced with a potential danger, lizards will sacrifice their tails for survival.
If you encounter emotions that you struggle to control, it may be best to cut something out of your life.`,
  ],
];

const slug = (s) => s.toLowerCase().replace(/[^a-z]+/g, "-");

export const OBJECTS = raw.map(([tier, name, short, text, lore]) => ({ id: slug(name), tier, name, short, text, lore }));

export const OBJECT_BY_ID = new Map(OBJECTS.map((o) => [o.id, o]));

export const objectsOf = (tier) => OBJECTS.filter((o) => o.tier === tier);

// Only these can be tied to the Fortune Slip Hanger.
export const isBad = (tier) => tier === "misfortune" || tier === "great-misfortune";

// Quest variants of the slip, tracked as a one-off collection.
export const VARIANTS = [
  { id: "illegible", name: "Illegible Fortune Slip", source: "Prayer in Progress..." },
  { id: "lyudochka", name: "Lyudochka's Fortune Slip", source: "Where the Dandelions Find Rest" },
  { id: "special-replacement", name: "Special Fortune Slip", source: "The Replacement's Secret" },
  { id: "special", name: "Special Fortune Slip", source: "" },
  { id: "strange", name: "Strange Fortune Slip", source: "" },
];

export const VARIANT_BY_ID = new Map(VARIANTS.map((v) => [v.id, v]));
