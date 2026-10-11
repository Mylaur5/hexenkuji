// Imaginarium Theater seasonal fortune slips, in wiki order (id = index + 1).
// `source` is the book citation printed on the slip; `text` is the fortune.
// Source: Genshin Impact Fandom wiki, Imaginarium Theater/Fortune Slips.
const raw = [
  [
    "Shifting Forms of Favonius Bladework (I)",
    `To hold regret and sorrow within oneself is unspeakable agony, to roast your very soul.
Do not allow your soul to be scorched, charred black by flame.
A mind consumed by misery and agony is a lure for tragedy and destruction.
Know, then, to nourish your heart as if it were a flower to be cared for.
A spring of sweet waters lies within the depths of your soul — and even amid despair, there is hope.`,
  ],
  [
    "Breeze Amidst the Forest: Spins-In-Circles Simon",
    `If you fall to stagnation, the way forward and back will be obscured.
At such times, any rash decision is merely an opportunity for future misfortune to ambush you.
Know that stopping to think things over is no sign of weakness, but always remember that your body is subject to the ticking clock.
And when the timepiece rings, you must make your move.`,
  ],
  [
    "Hilichurl Cultural Customs (II)",
    `Random little things can bring great happiness, inspiring laughter and smiles into which sunlight seeps.
Yet one can never have too much joy, and thus, the happiness of the present should be treasured.
Our lives are made up of countless fleeting "present" moments that pass us by.
Even hilichurls, therefore, know the meaning of "living in the present."
Seize these beautiful moments and string them together into joys still greater.`,
  ],
  [
    "Tales of the Holy Place (the missing brick)",
    `What we wish in our hearts to make reality, we pour all our soul into making perfect.
But beware the flaws that lie beneath a shining surface.
The surface of the sea is often calmest just before a tidal wave, and disaster needs but an instant to strike.
The flight of birds signals the coming tempest, and the mountains roar before an avalanche.
All evils have their portents, so be sure to keep your eyes wide open.`,
  ],
  [
    "Mondstadt Botanical Yearbook",
    `Having persevered to the very end, the light of dawn is but a heartbeat away.
Your lengthy exhaustion shall receive succor, and the future is suffused with honeyed sweetness.
The fruit of your sweating brow is about to ripen — you need only reach out and pluck it.
The harvest reaped by the hardworking is the most marvelous tale in this world.
So rejoice and be merry, for this labor shall soon be your richest reward.`,
  ],
  [
    "Along with Divinity (IX)",
    `It is futile to agonize over things that have yet to come to pass.
Rather than hesitate, why not take the first step, boldly pushing forward?
The path ahead may be fraught with unknown difficulties, but it matters not.
In this, your past experiences shall be your greatest teacher.`,
  ],
  [
    "Breeze Upon the Lake: A Midsummer Night's Song",
    `Do not allow trivial everyday drudgery to trip you up,
Nor should you let those boring anxieties take over your life.
Strike out, while the fire in your heart yet burns!
Bloom at the most opportune time like the rose,
Even if the price is that you must wither, shall it not have been worth it?`,
  ],
  [
    "Mondstadt Fables Omnibus (XII): The Tale of Two Foxes",
    `The answer to intractable troubles can prove beyond the scope of your best efforts.
But perhaps it is not a question of ability, but one of timing.
In your darkest hour, the light at the end of the tunnel may be seen most clearly, and all the problems that beset you may be effortlessly solved.
Come, friend. No need to be anxious about such things. Simply let time bring you an answer.`,
  ],
  [
    "History of Kings and Clans: Tyrants, Heirs, and Rebels (I)",
    `Nostalgia is a tempting prospect when plagued by difficulty and doubt.
Yet no matter how one yearns and reminiscences, those past joys have long turned to smoke and mist.
If you lack the courage to step forward, the path to the future shall never open.`,
  ],
  [
    "Breeze Amidst the Forest: Third Autumn Wind Song",
    `They say that fate is fickle, but the seasons turn as they ever have.
Know that shriveled glory is but a pale shade of living.
Things in life cannot be forced into being, so one might as well go with the flow and embrace what comes.
Whether laughter or tears, all are part and parcel of living.`,
  ],
  [
    "Breeze Amidst the Forest: Anecdotal Anthology Part VI",
    `When unfortunate incidents occur, good luck waves at you from secret places.
You will find an opportunity for a "turnaround" hidden in the most unexpected of corners.
What comes after can only be "better and best."
Perhaps taking the opportunity to sort things out at home will result in unexpected gains?`,
  ],
  [
    "History of Kings and Clans: Tyrants, Heirs, and Rebels (XII)",
    `Dissatifaction [sic] with present circumstances is suffocating, leading to much inward lamentation.
Fortune favors those who reach out early, so make preparations to make that stitch in time.
If you wait until sunset's final rays shine upon the treetops and the springwater beneath your feet is but parched riverbed...
At that point, no amount of inspired action will salvage the situation.`,
  ],
  [
    "Monstrous Gastronomy: Preface",
    `People often say that you should not eat mushrooms you find growing by the road.
Yet how often they forget the basic principles of how to survive in dire circumstances.
Open your mind! Use what is before you to cut a path forward.
Surely, something preferable to being forced to eat monsters will happen to you.`,
  ],
  [
    "Breeze Upon the Lake: Anecdotal Anthology Part VII",
    `Overflowing synonymity often proves shallow and thin-spread, while experiences born of purity cut deeper.
Focus on what you're looking forward to most, and you'll be rewarded far more than you imagine.
Embrace sincere hope in your heart, and see the future of your dreams run toward you.`,
  ],
  [
    "Mondstadt Fables Omnibus (IV): Pike the Fox",
    `Though you may hold sweet, mellow wine in your hand, the wine in another's cup seems finer still.
Still, do not forget the fundamental differences that exist between yourself and others.
Polish the dust-lined pearl in your heart, for that is a precious thing.
And just like that fox's fine friend, be a fine "you."`,
  ],
  [
    "Mondstadt Fables Omnibus (VI): The Caged Bird",
    `Regret is futile once misfortune has already befallen you.
A thousand "if onlys" will not change the present situation.
Friend, do not let self-blame and regret halt your steps.
You can only save yourself by actively working your way out.`,
  ],
  [
    "Breeze Amidst the Forest: Ode to the Thousand Winds",
    `Wealth can add color to your life,
But it cannot add true happiness.
The value of an item lies not in its appearance,
For love and sincerity are the truest treasures.`,
  ],
  [
    "History of Kings and Clans: Tyrants, Heirs, and Rebels (V)",
    `History's mighty heroes have forged the lives we lead today,
And their stories give us the courage to face our struggles.
When such difficulties bog us down, it may behoove us to think upon our forebears!
Perhaps their sagas can be to us a font of wisdom and strength.`,
  ],
  [
    "Breeze Upon the Lake: The Wayfarer's Song",
    `Refreshing springs and flowers, the summer breeze, familiar streets...
Every person has a "homeland" in their hearts that belongs only to them.
When you feel exhausted, slow down a little and look to the past.
It is the past, after all, that grants us the strength to move forward.`,
  ],
  [
    "Tales of the Holy Place (the Seneschal)",
    `The road ahead is a tangle of unexpected circumstances.
Sticking to dusty old strictures will only lead to further difficulties.
As such, be adaptable — use different strategies tailored to your situation to achieve victory.`,
  ],
  [
    "Wolfhook and Weasel Thief's 200-Step Winter",
    `Ill fortune often brings anxiety, and it will whisper ceaselessly in your ear.
It will tell you that you must keep your eyes on the prize, that you should keep moving toward it.
But rushing forward in a panic may instead make your wish impossible to realize.
Perhaps you lacked the needed calm or ignored vital help that might have been close to hand—
Like a wolfhook that got caught on your coat at some unknown point, becoming the perfect sustenance in time of dire need.`,
  ],
  [
    "The Ones the Wind Forgot: Decarabian's People",
    `To cast one's hopes upon tomorrow in exchange for a brief moment of peace...
That something is tried and true is an intoxicating thought.
But what if the "you" of tomorrow is also waiting on opportunities created in the past?
Waiting for all the previously invested effort that has been built up for this moment to bring about some transformation?
This test of promise-keeping could only ever be approached one way.
Know that delay and regret are inseparable twins.
Perhaps it is best to take action immediately, both today and tomorrow.`,
  ],
  [
    "Breeze Amidst the Forest: Traveler's Night-Song",
    `To persevere is no doubt important, but only rest can fight one's fatigue.
Though your labors shall bear fruit, do not overlook the beauty that lies before you.
Rest as needed. Do not miss out on such joys near at hand.`,
  ],
  [
    "Along with Divinity (III)",
    `You go forward with dreams and hope in your heart, but not without an indistinct sense of unease.
If you desire guidance or answers, rely not on that which is external and illusory.
The world is filled with a cacophony of views, but among them, your inner voice alone can know that which is truest.`,
  ],
  [
    "Mondstadt Gourmet Anthology (I): Mushroom Pizza",
    `To hold regret and sorrow within oneself is unspeakable agony, to roast your very soul.
But just as Mushroom Pizza must go through the flames,
To become as fragrant as it is, persist, persist resolutely in your path.
One day, that hard work shall become something worthy of dance and song.`,
  ],
  [
    "Mondstadt Travel Guide: Windrise",
    `As our ancestors said, in barren soil are the seeds of tomorrow buried.
Dreams and hope will eventually penetrate that dark, hardened earth, growing into a tree that touches the skies.
Enjoy the present moment, for this journey shall nourish the future.`,
  ],
  [
    "The Fox in the Dandelion Sea (IV)",
    `Everyone has moments where they feel trapped by doubt.
Believe in your heart and where it leads you, and go forth even amidst uncertainty.
Someday, you too will become like a dandelion,
Unfettered, floating and flying free toward your distant dream.
The path to the future is not paved with only tears and moonlight.`,
  ],
  [
    "Breeze Upon the Lake: Songs of Dawnlight Part VI",
    `Any choice you make will change the present situation.
Do not be troubled by this, however, and step out ahead boldly onto the road ahead.
Carry hope in your heart and press on resolutely, just as the legendary knights once did.
And where the sun sets, the morning wind shall bring about a new day.`,
  ],
  [
    "The Mondstadt Tower (III)",
    `In pursuing a beautiful dream, one may find it as elusive as Inès's enchanting song.
Know that obstinate is not derogatory by any means, for it is only another way of saying "conviction."
But remember that the meaning of such a pursuit lies in the journey itself.
Do not forget the beautiful vision you beheld at the beginning amidst your chase.`,
  ],
  [
    "Breeze Upon the Lake: Song of Spring and Rose",
    `Circumstances may not match your expectations, but in them also lurk new opportunities.
As long as you hold hope for the future in your heart, joyful days shall come again, right on schedule.`,
  ],
  [
    "History of Kings and Clans: The Cultivation of Mondstadt (V)",
    `Your long labors shall at last be rewarded, and days of relaxation shall soon arrive.
Go, enjoy song and merriment with the friends who accompanied you.
After all, neither fine treasure nor food can surpass the wondrous time you spent together.`,
  ],
  [
    "History of Kings and Clans: Tyrants, Heirs, and Rebels (III)",
    `The days of the aristocracy are long dead and gone, but the instructive words from those days remain incisive.
Do not pride yourself on trivial achievements, or indulge yourself on impoverished benefits.
Arrogance blinds you in both eyes, such that you cannot see disaster staring you in the face.
Remain humble and maintain control — that is how you will achieve still greater things.`,
  ],
  [
    "Breeze Amidst the Forest: Harvest Song",
    `Just as flowers do not spring from the soil without cause, so too is it with how all and sundry denounce any gains made without putting in the work.
No amount of sighs will free you from a muck of trouble, and fields watered with negativity bear harvests of disaster.
Do not revel in indolence's sweet stupor, for it forges the shackles of defeat and lures people to terrible downfall.`,
  ],
  [
    "History of Kings and Clans: Tyrants, Heirs, and Rebels (XI)",
    `The problem before you is complex and unusual, as impregnable as a tower.
But do not lose your way, for the answer is hidden within nonetheless.
Just as a blade can be forged from chains, so are your surroundings your secret strength.`,
  ],
  [
    "Alchemy 101: Preface",
    `Knowledge stored in books does not wisdom make, no more than the reflection in a lake is the real thing.
Fools drink themselves into hypothetical stupors, while the sagacious seek truth earnestly.
Do not be deceived by false paralysis, but do not make reckless decisions either.
Cool rationality is the font of hope within chaos.`,
  ],
  [
    "Breeze Amidst the Forest: Early Spring Series Part III",
    `Spring sneaks up silently, and all things are renewed.
If you wish to gain something from it, then set out on your journey immediately.
Fortune favors the bold, so fear not the road ahead. Do not tarry for too long, or you may regret it.`,
  ],
  [
    "Unnamed slip: letter from Barbeloth (astrology)",
    `To be honest, we weren't the most familiar of people in the organization Alice founded. But I find that things and people around me have changed much in the many years that followed... and now, you are amongst the few I am most acquainted with.
I must confess that I did not initially understand what Alice saw in you. Being "interesting" was the measuring stick, said she, and being the "most interesting" was the only criterion for being invited to join. Later, I realized that I had only thought that I had understood your stories. That your acuity for the world's operating principles could perhaps sometimes surpass that of astrology. Sometimes, that is!
I, too, have grown old, and I do not know how long I have left. So yes, I admit that I really do miss you, just a little. Not that I would actually go over to keep you company or anything, though.`,
  ],
  [
    "Unnamed slip: letter from Alice (travelling Teyvat)",
    `I travel around Teyvat every so often to see if any landscape-altering changes have happened in the meantime, rewriting my seven-nation travel guide once sufficiently few people remember my name.
But I've been feeling tired of late for some reason. Might be the coming of spring.
In Mondstadt, I met a girl who looked very much like you when you were little. I walked with her for a bit out of boredom, and as it turned out, she just so happened to be returning a book to the library. One of yours, in fact.
So I got it in my head to brag a little — I do have signed copies in my possession, after all! Didn't expect her to say that she didn't like your stories.
Thinking that she hadn't understood, I explained that the boar, the wolf, and the forest were all symbols. That they were each stand-ins, making the story a most deep mystery indeed.
You know what she said? "I know that. But the world has changed."
Ah, how I wish you were there at that moment! You'd have it out with her right there and then, and you'd end off by saying: "Well who's the author here, you or me?" But for some reason, I said nothing at all.
She looked askance at me for a few moments before pulling a hanky out and wiping the sweat born from the sweltering spring off my face. Then she waved, and disappeared completely into the crowd, bouncing pigtails and all.
I was so furious, you know — why, it almost brought me to tears! Really, what's a little girl's word on the state of the wider world, anyway? And so I must go see for myself. On that note, I shan't tarry here thinking about you too much. Today is a good day for traveling, after all.`,
  ],
  [
    "Unnamed slip: letter from Nicole (inability to speak)",
    `In truth, I said all I wished to say to you in the end, but Alice still advised me to write a little, saying that what I cannot say aloud, I can always write, surely. That is the case, though I have spoken directly into peoples' minds for so long... that I never practiced my penmanship anyway.
No need to worry if I've pried into any of your innermost thoughts, I've never done anything like that. If that does not reassure you, let me share one of my secrets with you. Having been suffocated by my inability to speak, I wound up being an incredibly talkative person at first. Alice noted that those who used their real mouths to blather on with had far fewer problems than I, since I would set my head abuzz and give myself quite a headache whenever I spoke. She advised me to speak more steadily and present an air of mystery and nobility — which is how I wound up speaking the way you remember.
I'm off, in any case. There's not much to worry about here with you — so why don't you watch over me instead?`,
  ],
  [
    "Unnamed slip: letter from I. Ivanovna N. (Snezhnaya)",
    `Barbie's gotten old, letting her emotions get in the way of proper writing. Not so I — as the first Mayor, I requested Alice to help me settle various trifling matters in Snezhnaya. And in exchange, she asked that I pen a passage in here.
I do not believe in any world after death, so we must live our best while we still draw breath. As such, I do not think you will read a word I write here — I write to myself alone.
Neither of us ever had any magic or combat training. We are simply ordinary. As such, we might be able to come to an understanding, though I believe otherwise. Alice was too ██ing good to you. Back in the day, she dragged me through waterways, blowing furnaces up, catching a cat within a Domain... The process was complicated and far from straightforward, but in any case, it was meant to protect the people around us.
You might have wondered, is this the price of getting along with this gaggle of mad women? I doubt you would agree with that assessment, nor would I. Those were, after all, the most precious days of our time together, were they not?`,
  ],
];

export const SLIPS = raw.map(([source, text], i) => ({
  id: i + 1,
  source,
  text,
  // First line, for lists.
  preview: text.split("\n")[0],
  // The four Hexenzirkel letters have no book citation.
  letter: source.startsWith("Unnamed slip"),
}));

export const SLIP_BY_ID = new Map(SLIPS.map((s) => [s.id, s]));
