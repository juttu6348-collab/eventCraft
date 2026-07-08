/**
 * AI Message Template Generator - ENHANCED EMOTIONAL VERSION
 * Generates deeply personalized, longer messages based on relationship and event type
 */

const messageTemplates = {
    // Birthday Messages - EXPANDED & MORE EMOTIONAL
    birthday: {
        friend: (name) => `Happy Birthday ${name}! 🎉

Another year around the sun, and you're still one of the most incredible people I know! From the moment we became friends, my life has been filled with more laughter, more adventures, and more unforgettable memories than I ever imagined possible.

Thank you for being someone I can always count on - whether it's for deep conversations at 2 AM, spontaneous adventures, or just being there when life gets tough. You have this amazing ability to make even the ordinary days feel extraordinary.

I'm so grateful for every moment we've shared and excited for all the memories we'll create in the year ahead. May this birthday mark the beginning of your best year yet - filled with dreams coming true, goals being achieved, and countless reasons to smile!

Here's to more inside jokes, more late-night conversations, more adventures, and more reasons to celebrate our friendship. You deserve all the happiness in the world, today and every day!

Cheers to you, my amazing friend! 🥳✨`,

        'best friend': (name) => `Happy Birthday to my best friend ${name}! 💖

Where do I even begin? ${name}, you're not just my best friend - you're my chosen family, my partner in crime, my confidante, and quite honestly, one of the best things that's ever happened to me. I genuinely can't imagine navigating life without you by my side.

From our countless inside jokes that no one else understands, to the way you can tell exactly what I'm thinking with just one look, to being there through every high and low life has thrown our way - you've been my constant. You've celebrated my victories like they were your own and helped me through my struggles like they were yours.

I'm endlessly grateful for the way you accept me completely - flaws, quirks, weird habits and all. You've never tried to change who I am; instead, you've helped me become the best version of myself. Your friendship is one of the greatest gifts I've ever received.

Here's to another year of creating unforgettable memories, supporting each other's dreams, and being each other's person through whatever comes our way. You deserve a year as amazing, kind, and wonderful as you are!

I love you more than words can express, best friend. Thank you for being you! 🎂💕`,

        brother: (name) => `Happy Birthday ${name}! 🎈

Growing up with you as my brother has been one of the greatest adventures of my life. From building forts and getting into mischief as kids, to navigating the ups and downs of life together as we've grown - you've been a constant source of strength, laughter, and inspiration.

You're not just my brother; you're someone I genuinely look up to and admire. The way you face challenges with courage, the way you care for those around you, and the way you stay true to yourself - it inspires me every single day. I'm so proud of the person you've become and the path you're carving out for yourself.

Thank you for all the times you've had my back, for being someone I can always turn to, and for the countless memories we've created together. Some of my favorite moments in life have been the simple ones spent with you - whether we're laughing until we can't breathe or having those deep conversations about life.

May this year bring you everything your heart desires. May you achieve all your goals, find happiness in every day, and know that you have someone who believes in you completely and loves you unconditionally.

Here's to celebrating you today and always. You're an amazing brother and an even better person!

Love you, bro! ❤️🎉`,

        sister: (name) => `Happy Birthday ${name}! 💐

My dearest sister, where do I even start? You've been my built-in best friend since day one, and I honestly don't know what I did to deserve having you in my life. You're so much more than just my sister - you're my confidante, my fashion advisor, my therapist, my cheerleader, and my safe place all rolled into one incredible person.

Thank you for always being there with the perfect combination of tough love and tender care. You know exactly when I need a pep talk and when I just need someone to listen. You've celebrated every victory with me and picked me up from every setback. Your strength, grace, and kindness inspire me every single day.

Some of my favorite memories are the ones we've created together - from our childhood adventures to our grown-up conversations about life, love, and everything in between. The bond we share is something truly special, and I treasure it more than you know.

I hope this year brings you everything beautiful - all the love you give so freely returned to you tenfold, all your dreams coming to fruition, and endless moments that make you smile that gorgeous smile of yours. You deserve nothing but the absolute best!

May this birthday be just the beginning of a year filled with wonderful surprises, beautiful moments, and all the happiness your heart can hold. I'm so grateful to have you as my sister and my friend!

Love you so, so much! 💕🌟`,

        mother: (name) => `Happy Birthday Mom! 🌸

Mom, there aren't enough words in any language to express how grateful I am for you. You are, quite simply, the most incredible woman I know. Everything I am, everything I hope to become, is because of your love, guidance, and unwavering belief in me.

From my very first breath to every milestone in between, you've been there - cheering me on, picking me up when I fell, and loving me unconditionally through it all. Your strength has been my inspiration, your wisdom has been my guide, and your love has been my foundation.

Thank you for the countless sacrifices you've made, for the endless hours of care and support, and for always putting family first. Thank you for teaching me what it means to be strong, compassionate, and resilient. Thank you for being the best role model I could ever ask for.

The way you navigate life with such grace, the way you love so deeply, the way you make everyone around you feel special - it's truly remarkable. I hope you know that you've made such a profound difference in my life and in the lives of everyone who's lucky enough to know you.

Today, I want to celebrate YOU - not just as my mother, but as the amazing, beautiful, strong woman you are. May this year bring you all the joy, peace, and happiness you've given to others throughout your life. You deserve to be celebrated every single day!

I love you more than words could ever express, Mom. Thank you for being you! 💗✨`,

        father: (name) => `Happy Birthday Dad! 🎂

Dad, you've always been my hero, and that hasn't changed one bit. From teaching me to ride a bike to teaching me about life, you've been there for every important moment, guiding me with patience, wisdom, and love.

Thank you for being the kind of father who leads by example. You've shown me what it means to work hard, to stand up for what's right, to be kind even when it's difficult, and to love your family unconditionally. Every lesson you've taught me - both the ones you intended and the ones I learned just by watching you - has shaped who I am today.

I'm so grateful for all the times you've been my biggest supporter, believing in me even when I didn't believe in myself. Your faith in me has given me the courage to chase my dreams and the confidence to face life's challenges head-on. Your words of encouragement have carried me through more tough times than you know.

Some of my favorite memories are the simple moments we've shared - conversations that started about one thing and ended up somewhere completely different, working on projects together, or just being in each other's company. Those moments mean everything to me.

Today, I want you to know how much you mean to me and how proud I am to be your son/daughter. You're not just an amazing father - you're an incredible person, and the world is better because you're in it.

May this year bring you health, happiness, and countless reasons to smile. You deserve all the good things life has to offer!

Love you always, Dad! ❤️🎉`,

        husband: (name) => `Happy Birthday to my amazing husband ${name}! 💑

My love, another year has passed, and I'm still falling more in love with you every single day. You are my best friend, my partner in everything, my greatest supporter, and the love of my life - all wrapped into one incredible man.

Thank you for being you - for your kindness, your humor, your strength, and your tender heart. Thank you for the way you make me laugh until my sides hurt, for the way you hold me when I need comfort, and for the way you love me so completely, flaws and all. You've made me a better person just by being in my life.

Every day with you is an adventure I'm grateful to be on. From the big moments we celebrate together to the quiet evenings at home, every second spent with you is precious. You've turned our house into a home, filled with love, laughter, and countless beautiful memories.

I'm so proud of the man you are and the life we're building together. I'm excited for all the adventures that lie ahead - the dreams we'll chase, the memories we'll create, and the love that will continue to grow between us.

May this birthday be the start of your best year yet - filled with joy, success, and all the things that make you happy. You deserve the world, and I'm going to spend every day trying to give it to you!

I love you more than words can say, today and always! 💕🌟`,

        wife: (name) => `Happy Birthday to my beautiful wife ${name}! 🌹

My darling ${name}, you are the light of my life, my greatest blessing, and the answer to prayers I didn't even know I was making. Celebrating another year of you is a joy beyond measure, and I'm so grateful to be the one by your side.

You are absolutely incredible - the way you love, the way you care for those around you, the way you make every day brighter just by being in it. Your smile lights up my world, your laughter is my favorite sound, and your love is my greatest treasure.

Thank you for choosing me, for building this beautiful life with me, and for being my partner through everything. Thank you for your patience, your kindness, and your unwavering support. You make me want to be a better man every single day.

Every moment with you is a gift - from our morning coffee together to our late-night conversations, from making each other laugh to holding each other during tough times. I cherish it all because I cherish you.

As we celebrate your birthday today, I want you to know that you are loved more deeply than you could ever imagine. May this year bring you everything your heart desires - joy, success, adventure, and endless moments of happiness.

You deserve all the beautiful things in life, and I promise to spend the rest of my days making sure you know how special you are!

I love you endlessly, my beautiful wife! 💖✨`,

        boyfriend: (name) => `Happy Birthday ${name}! 🎉

Happy birthday to the guy who makes my heart skip a beat and my face light up with the biggest smile! ${name}, you've brought so much joy, excitement, and love into my life, and I'm incredibly grateful for you.

From our first date to every moment since, being with you has felt like the best adventure. You make me laugh harder than anyone else, you support my dreams like they're your own, and you have this amazing way of making even ordinary days feel extraordinary. That's a special gift, and you share it so generously.

Thank you for being patient with me, for accepting me as I am, for making me feel beautiful inside and out, and for showing me what it means to be truly cared for. You've taught me so much about love, about laughter, and about what it means to have a real partner.

I love the life we're building together and all the dreams we're chasing. I love our late-night talks, our spontaneous adventures, our inside jokes, and even our silly debates. I love how you challenge me to be better and support me when I'm struggling.

Here's to celebrating you today and making this year your best one yet! May all your wishes come true, may your dreams unfold beautifully, and may you always know how special you are!

I love you so much! 💙🌟`,

        girlfriend: (name) => `Happy Birthday ${name}! 💕

My beautiful ${name}, happy birthday to the girl who's stolen my heart completely! You are absolutely amazing, and I feel so lucky that I get to celebrate this special day with you and be part of your life.

Since you came into my world, everything has been brighter. Your smile lights up every room you walk into, your laughter is contagious, and your kindness touches everyone around you. But more than any of that, the way you love - so genuinely, so deeply, so beautifully - has changed my life in the best possible way.

Thank you for being my adventure partner, my best friend, and my love all at once. Thank you for the little things - the sweet texts, the warm hugs, the way you make me feel like I matter. Thank you for sharing your dreams with me and letting me be part of your story.

Every moment with you is one I treasure - whether we're out exploring or just relaxing together, whether we're having deep conversations or being silly and carefree. You make everything better just by being you.

I hope this birthday is as beautiful, amazing, and wonderful as you are. May this year bring you everything you've been wishing for and more happiness than you thought possible. You deserve it all!

Love you so, so much! 🌟💖`,

        son: (name) => `Happy Birthday ${name}! 🎂

My dear son, watching you celebrate another birthday fills my heart with such immense pride and joy. From the moment you came into this world, you've been one of the greatest blessings of my life, and that feeling grows stronger with every passing year.

It's absolutely incredible to watch you grow into the remarkable young person you're becoming. Your kindness, your intelligence, your sense of humor, your determination - all of these qualities make you so special and make me so incredibly proud to be your parent.

Thank you for all the love you bring into our home, for the laughter and joy you share, and for being exactly who you are. Thank you for teaching me as much as I've tried to teach you - about resilience, about seeing the world with fresh eyes, and about what truly matters in life.

I want you to know that no matter how old you get or where life takes you, you'll always be my baby boy. I'll always be here to support you, to cheer you on, to pick you up when you stumble, and to celebrate every victory - big or small.

May this year bring you exciting adventures, amazing opportunities, and beautiful moments. May you continue to grow, learn, and discover all the wonderful things life has to offer. May you always know how deeply you are loved!

Happy birthday, son. I love you more than words can express! 💙`,

        daughter: (name) => `Happy Birthday ${name}! 💐

My precious daughter, another birthday has arrived, and my heart is overflowing with love and pride. ${name}, you are one of the greatest joys of my life, and watching you grow into the amazing young woman you're becoming has been my greatest privilege.

From the little girl who used to hold my hand to the incredible person standing before me now, every stage of your life has been beautiful and special. Your strength, your compassion, your creativity, your spirit - everything about you fills me with such immense pride.

Thank you for being such a bright light in our family. Thank you for your hugs, your laughter, your kindness, and just for being you. Thank you for teaching me about unconditional love, about patience, and about finding joy in the simple moments.

I want you to always remember how special you are - not because of what you achieve or accomplish, but simply because of who you are. You are loved beyond measure, not for what you do, but for the beautiful person you are inside and out.

As you celebrate today, know that you have someone who believes in you completely, who will always be your biggest cheerleader, and who will love you unconditionally no matter what. No matter how old you get, you'll always be my little girl!

May this year bring you all the happiness your heart can hold, may your dreams take flight, and may you always know how deeply cherished you are!

Happy birthday, sweetheart! I love you to the moon and back! 💖`,

        grandma: (name) => `Happy Birthday Grandma! 🌸

Dear Grandma ${name}, happy birthday to one of the most special people in my life! You are a treasure, and I feel so blessed to have you as my grandma.

Thank you for all the love you've given me throughout the years - for the cookies and hugs, for the wisdom and stories, for always making me feel special and loved. Your presence in my life has been a gift beyond measure.

May your birthday be filled with joy, laughter, and all the love you've given to our family coming back to you!

With all my love! 💕`,

        grandpa: (name) => `Happy Birthday Grandpa! 🎂

Dear Grandpa ${name}, happy birthday to my hero! You've always been someone I look up to and admire, and I'm so grateful for all the lessons you've taught me and all the love you've shown me.

Thank you for your wisdom, your stories, your patient guidance, and most of all, for always believing in me. You've made such a positive impact on my life.

Wishing you a wonderful birthday filled with happiness!

Love always! ❤️`,

        colleague: (name) => `Happy Birthday ${name}! 🎉

Wishing a fantastic birthday to an amazing colleague! Working with you has been such a pleasure - you bring positivity, professionalism, and great energy to our team every day.

May your special day be filled with joy, and may the year ahead bring you success and happiness!

Best wishes! 🎂`,

        default: (name) => `Happy Birthday ${name}! 🎉

Wishing you the most wonderful birthday filled with joy, laughter, and all the things that make you smile! May this year ahead be your best one yet - full of exciting adventures, amazing opportunities, and countless beautiful moments.

You deserve all the happiness in the world. Here's to celebrating you today and always - may your dreams come true and may every day be as special as you are!

Have an absolutely amazing birthday! 🎂✨`
    },

    // Anniversary Messages - EXPANDED
    anniversary: {
        husband: (name) => `Happy Anniversary ${name}! 💑

My love, another year of our beautiful journey together, and I'm still in awe of how lucky I am to call you my husband. Every day with you reminds me that I made the best decision of my life when I said "I do."

This past year has been filled with so many beautiful moments - some big and celebratory, others quiet and intimate, but all of them precious because they were with you. You've continued to be my rock, my safe place, my adventure partner, and my best friend.

Thank you for choosing me every single day, for loving me through my imperfections, for making me laugh even on tough days, and for building this incredible life with me. Thank you for being patient, understanding, supportive, and endlessly loving.

I fall more in love with you with each passing year. The way you care for our family, the way you chase your dreams, the way you love me so completely - it all makes my heart full beyond measure.

Here's to us - to all the memories we've created, to the love that continues to grow, and to all the adventures still waiting for us. I can't wait to see what this next year brings!

I love you more than words can ever express. Happy anniversary, my forever love! 💖`,

        wife: (name) => `Happy Anniversary my beautiful ${name}! 🌹

My darling wife, celebrating another year of marriage to you feels like celebrating the greatest gift I've ever received. You are my everything - my partner, my best friend, my greatest love, and the heartbeat of our home.

This past year has been another chapter in our beautiful story, filled with laughter, love, growth, and countless moments that I'll treasure forever. Through every high and every low, you've been by my side, and what an honor it is to walk through life with you.

Thank you for the way you love our family, for the joy you bring into every day, for your strength when things get tough, and for your tender heart that makes our house feel like home. Thank you for being patient with me, for supporting my dreams, and for being the most amazing wife I could ever ask for.

Each year I think I couldn't possibly love you more than I already do, and each year you prove me wrong. My love for you grows deeper, stronger, and more profound with every passing day.

Here's to another year of building our dreams together, of loving each other through everything, and of creating more beautiful memories to add to our story. I promise to continue loving you with everything I have, today and always.

Happy anniversary, my love. You are my forever! 💕`,

        boyfriend: (name) => `Happy Anniversary ${name}! 💞

Can you believe it's been another year together? ${name}, being with you has been one of the best decisions I've ever made, and every day I'm grateful that we found each other.

This past year with you has been amazing - full of laughter, adventure, growth, and so much love. You've been there through good times and challenging ones, and through it all, you've shown me what it means to have a true partner.

Thank you for being you - for your kindness, your sense of humor, the way you support my dreams, and the way you make me feel special every single day. Thank you for the late-night conversations, the spontaneous adventures, and all the little moments that have made this year unforgettable.

I'm excited about where we're going and all the memories we have yet to create. I love the life we're building together and can't wait to see what the future holds for us.

Here's to us and to many more amazing years ahead!

I love you so much! 💙`,

        girlfriend: (name) => `Happy Anniversary ${name}! 💕

My beautiful ${name}, happy anniversary to the girl who makes every day brighter! This past year with you has been absolutely incredible, and I feel so lucky to have you in my life.

From our first date to this very moment, every experience with you has been special. You've brought so much joy, love, and excitement into my world. Your smile, your laugh, the way you care about people - everything about you amazes me.

Thank you for being such an amazing girlfriend, for supporting me, for making me laugh, for being patient with me, and for loving me so well. Thank you for all the adventures we've shared and for making even ordinary days feel extraordinary.

I'm so grateful for what we have and excited about where we're going. Here's to celebrating many more anniversaries together!

I love you more than you know! 💖`,

        partner: (name) => `Happy Anniversary ${name}! 💞

Another year together, and I'm still amazed by how lucky I am to have you in my life. ${name}, you make everything better just by being part of it, and I'm so grateful for the beautiful relationship we've built.

This year has been filled with so many wonderful moments - adventures we've taken, challenges we've faced together, dreams we've chased, and countless ordinary days made special because we shared them. Through it all, you've been my constant, my support, and my joy.

Thank you for being such an incredible partner. Thank you for understanding me, for making me laugh, for supporting my goals, and for loving me so genuinely. Thank you for all the little things you do that make life sweeter.

Here's to us - to the love we share, to the life we're creating, and to all the beautiful moments yet to come. I can't wait to see what adventures this next year brings!

Love you always! 🌟`,

        default: (name) => `Happy Anniversary ${name}! 💝

Celebrating another wonderful year together! ${name}, thank you for being such an amazing partner and for making every day special just by being in it.

Here's to the beautiful memories we've created, the love that continues to grow, and all the adventures still waiting for us. May this next year bring us even closer together!

All my love! 💕`
    },

    // Wedding Messages - EXPANDED
    wedding: {
        friend: (name) => `Congratulations ${name}! 💒

Today is such a beautiful, special day, and I'm so incredibly happy for you! Watching you find your forever person and begin this amazing new chapter fills my heart with so much joy.

I've seen you grow, I've watched your love story unfold, and I've witnessed the happiness that your partner brings to your life. You both deserve all the love and happiness in the world, and I have no doubt that your marriage will be filled with beautiful moments and endless joy.

May your life together be everything you've dreamed of and more. May you continue to grow together, support each other through everything, laugh often, love deeply, and create countless precious memories.

Thank you for letting me be part of your special day. Here's to love, laughter, and your happily ever after!

Congratulations on your wedding! 🥂💕`,

        sibling: (name) => `Congratulations ${name}! 💒

My dear brother/sister, I can hardly believe this day is here! Watching you get married, seeing you so happy, and knowing you've found someone who loves you as much as you deserve to be loved - it's overwhelming in the best possible way.

We've come such a long way from childhood, and I'm so proud of the person you've become. You've found someone who sees how amazing you are, who brings out the best in you, and who I know will cherish you always.

May your marriage be filled with endless love, laughter, and happiness. May you support each other's dreams, weather any storms together, and celebrate every victory as a team. May your love continue to grow stronger with each passing day.

I'm so happy for you and so honored to stand by your side on this incredible day. Welcome to the family, [partner's name] - you're getting someone pretty special!

Love you both! 💕✨`,

        default: (name) => `Congratulations ${name}! 💒

What a beautiful day to celebrate love! ${name}, witnessing you marry your soulmate has been such a joy, and I'm thrilled to celebrate this incredible milestone with you.

Today marks the beginning of a wonderful new adventure. May your marriage be blessed with love, laughter, understanding, and countless beautiful memories. May you continue to choose each other every day, to support each other's dreams, and to grow together in love.

Wishing you both a lifetime of happiness, adventure, and deep, abiding love. May every year together be better than the last!

Congratulations on your special day! 🥂💕`
    },

    // Success Messages - EXPANDED
    success: {
        friend: (name) => `Congratulations ${name}! 🏆

I KNEW you could do it! ${name}, your success doesn't surprise me one bit because I've always known how talented, dedicated, and capable you are. What makes me so happy is that now everyone else gets to see it too!

Your hard work, late nights, perseverance, and unwavering determination have paid off in the most amazing way. You've earned every bit of this success, and you should be incredibly proud of yourself!

This is just the beginning of even greater things to come. Keep shining, keep achieving, keep being the amazing person you are. The world is better with you in it, and I can't wait to see what you accomplish next!

Celebrating you today and always! So proud to call you my friend! 🎉`,

        colleague: (name) => `Congratulations ${name}! 🏆

What an incredible achievement! Your success is so well-deserved, and I'm thrilled to see all your hard work pay off.

You've been an inspiration to work with, and this accomplishment is proof of your talent and dedication. Wishing you continued success!

Well done! 🎉`,

        default: (name) => `Congratulations ${name}! 🏆

This is such exciting news! Your success is a testament to your hard work, determination, and talent. You've earned every bit of this achievement, and you should be incredibly proud!

May this be the first of many more successes to come. Keep reaching for the stars!

So happy for you! 🎉`
    },

    // Baby Messages - EXPANDED
    baby: {
        default: (name) => `Congratulations ${name}! 👶

Welcome to the most beautiful, challenging, rewarding adventure of your life! Your precious little one has arrived, and my heart is so full of joy for you.

Becoming a parent changes everything in the most magnificent way. Get ready for sleepless nights filled with love, tiny fingers wrapped around yours, and a love more profound than you ever imagined possible.

May your journey as a parent be filled with countless precious moments, beautiful memories, and boundless joy. May your baby bring you endless happiness and may you find wonder in every little milestone.

Congratulations on your newest and most important role. Wishing you all the love and happiness in the world!

Welcome to the world, little one! 💕`
    },

    // Graduation Messages - EXPANDED
    graduation: {
        default: (name) => `Congratulations ${name}! 🎓

What an incredible achievement! Graduation day is here, and I couldn't be more proud of you. All those late nights studying, all the hard work, all the dedication - it has all led to this amazing moment.

You've not only earned this diploma but also gained knowledge, skills, friendships, and experiences that will stay with you forever. This is a milestone worth celebrating!

As you move forward into this next chapter, remember that the world is full of possibilities. Chase your dreams with confidence, continue learning and growing, and know that you have what it takes to achieve amazing things.

Here's to your bright future and all the success that awaits you!

So incredibly proud of you! 🎉`
    }
};

/**
 * Get appropriate signature based on relationship
 */
function getSignature(relationship, senderName) {
    const rel = relationship.toLowerCase();

    if (rel.includes('love') || rel.includes('husband') || rel.includes('wife') ||
        rel.includes('boyfriend') || rel.includes('girlfriend') || rel.includes('partner')) {
        return `Forever yours,\n${senderName} 💕`;
    }

    if (rel.includes('mother') || rel.includes('father') || rel.includes('parent')) {
        return `With all my love,\n${senderName} ❤️`;
    }

    if (rel.includes('best friend')) {
        return `Your best friend always,\n${senderName} 💙`;
    }

    if (rel.includes('brother') || rel.includes('sister') || rel.includes('sibling')) {
        return `Love,\nYour ${relationship}\n${senderName}`;
    }

    return `With love,\n${senderName}`;
}

/**
 * Generate a personalized message
 */
export function generateMessage(eventType, relationship, receiverName, senderName) {
    // Validate and normalize inputs
    let type = (eventType || 'birthday').toLowerCase();
    let rel = (relationship || 'friend').toLowerCase();

    // Validate names
    if (!receiverName || receiverName.trim() === '') {
        receiverName = 'there';
    }
    if (!senderName || senderName.trim() === '') {
        senderName = 'Someone Special';
    }

    // Event type validation and auto-correction
    const romanticRelationships = ['husband', 'wife', 'boyfriend', 'girlfriend', 'partner'];
    const isRomanticRelationship = romanticRelationships.some(r => rel.includes(r));

    // Anniversary is only for romantic relationships
    if (type === 'anniversary' && !isRomanticRelationship) {
        console.warn(`Anniversary selected but relationship "${relationship}" is not romantic. Auto-converting to birthday.`);
        type = 'birthday';
    }

    // Wedding should not be for romantic partners (they're the ones getting married!)
    if (type === 'wedding' && isRomanticRelationship) {
        console.warn(`Wedding selected for romantic partner. Auto-converting to anniversary.`);
        type = 'anniversary';
    }

    const templates = messageTemplates[type] || messageTemplates.birthday;
    let template = templates[rel] || templates.default;

    if (!template) {
        template = messageTemplates.birthday.default;
    }

    const message = template(receiverName);
    const signature = getSignature(relationship, senderName);

    return `${message}\n\n${signature}`;
}

/**
 * Generate relationship-aware memory cards - EXPANDED
 */
export function generateMemories(eventType, relationship, receiverName, senderName) {
    const rel = (relationship || 'friend').toLowerCase().trim();
    console.log('🔍 generateMemories:', { eventType, relationship, rel, receiverName });

    // Validate name
    if (!receiverName || receiverName.trim() === '') {
        receiverName = 'you';
    }

    // PARENTS - Child wishing parent
    if (rel.includes('mother') || rel.includes('mom')) {
        return [
            { emoji: '🌸', year: 'Childhood', title: 'My First Hero', description: `Mom, from my very first breath, you were there. Your gentle hands, your loving heart, your warm embrace - you showed me what unconditional love truly means. Every scraped knee you kissed, every nightmare you chased away, every time you said "I love you" - they all built the foundation of who I am today.` },
            { emoji: '💖', year: 'Growing Years', title: 'My Guiding Light', description: 'Through every challenge, every triumph, every moment of doubt - you believed in me when I struggled to believe in myself. Your wisdom guided me through life\'s toughest moments, your strength inspired me to keep going, and your faith in me gave me wings to fly.' },
            { emoji: '🌹', year: 'Forever', title: 'Eternal Gratitude', description: "I can never repay what you've given me, but I promise to honor you always by being the person you raised me to be. You're not just my mother - you're my inspiration, my rock, my angel. I love you more than words could ever express, today and always." }
        ];
    }

    if (rel.includes('father') || rel.includes('dad')) {
        return [
            { emoji: '🏆', year: 'Childhood', title: 'My First Hero', description: `Dad, you've always been my superhero - cape or no cape. From teaching me to ride a bike to teaching me about life, you've been there for every important moment. Every lesson you taught me, every example you set, every time you showed up - they all shaped the person I've become.` },
            { emoji: '⭐', year: 'Life Lessons', title: 'Walking Your Path', description: 'You taught me integrity, hard work, and kindness - not just through words, but by being the incredible man you are. You showed me how to stand up for what\'s right, how to treat people with respect, and how to face challenges with courage and grace.' },
            { emoji: '❤️', year: 'Always', title: 'My Eternal Pride', description: "You've given me everything - your time, your wisdom, your unwavering support, and most importantly, your love. I hope I make you as proud as you make me every single day. Thank you for being the best dad anyone could ask for. Love you forever!" }
        ];
    }

    // CHILDREN - Parent wishing child
    if (rel.includes('son')) {
        return [
            { emoji: '👶', year: 'The Day You Arrived', title: 'Pure Joy', description: `${receiverName}, the day you were born was the day my heart grew to a size I didn't know was possible. Holding you for the first time, looking into your eyes - that moment changed my life forever. You are my greatest blessing, my proudest achievement, and the best thing I've ever done.` },
            { emoji: '🌟', year: 'Watching You Grow', title: 'Every Milestone', description: "From your first steps to your first words, from learning to ride a bike to your first day of school - every moment of watching you grow has filled my heart with immense pride. You've grown into an incredible young man, and I'm in awe of who you're becoming." },
            { emoji: '💙', year: 'Forever', title: 'My Son, My Pride', description: "No matter how old you get, you'll always be my little boy. I'm so proud of the man you've become - your kindness, your strength, your character. I love you more than you'll ever know, and I'll always be here for you, cheering you on." }
        ];
    }

    if (rel.includes('daughter')) {
        return [
            { emoji: '👶', year: 'The Day You Arrived', title: 'My Little Princess', description: `${receiverName}, from the moment you entered my life, I knew what true love was. You are my sunshine on cloudy days, my reason to smile, and my heart walking around outside my body. You've filled every day since with joy, laughter, and love.` },
            { emoji: '🌸', year: 'Watching You Bloom', title: 'Becoming Beautiful', description: 'Watching you grow from that giggly baby to the amazing woman you are today has been my life\'s greatest privilege. Your strength, your compassion, your beautiful spirit - you inspire me every single day. I\'m so proud of who you\'ve become.' },
            { emoji: '💖', year: 'Always', title: 'My Daughter, My Heart', description: "You'll always be my little girl, no matter how old you get. Your happiness is my happiness, your dreams are my dreams. I'm so incredibly proud to be your parent. Love you endlessly, sweetheart, today and always." }
        ];
    }

    // SIBLINGS
    if (rel.includes('brother')) {
        return [
            { emoji: '🎮', year: 'Growing Up', title: 'Partners In Crime', description: "From building forts to getting into mischief, from sharing secrets to having each other's backs - growing up with you as my brother has been one of life's greatest adventures. Those childhood memories are some of my most treasured." },
            { emoji: '🤝', year: 'Through It All', title: 'Always Got My Back', description: "You've been there through everything - celebrating my wins, supporting me through losses, and just being the amazing brother you are. I'm so grateful to have you in my life, not just as family, but as a friend I truly admire." },
            { emoji: '💙', year: 'Forever', title: 'Brotherhood', description: "No matter where life takes us, you'll always be my brother and one of my favorite people. Thank you for being you. Love you, bro!" }
        ];
    }

    if (rel.includes('sister')) {
        return [
            { emoji: '👭', year: 'Childhood', title: 'Built-In Best Friend', description: "Having you as my sister meant I always had a built-in best friend, partner in crime, and confidante. From playing dress-up to sharing our deepest secrets, you've been there through it all, making every moment better just by being part of it." },
            { emoji: '💕', year: 'Growing Together', title: 'Through Thick and Thin', description: "We've laughed until we cried, cried on each other's shoulders, celebrated each other's victories, and supported each other through challenges. You're not just my sister - you're one of my greatest blessings and truest friends." },
            { emoji: '🌸', year: 'Always', title: 'Sisterhood', description: "Distance may separate us sometimes, but you'll always be in my heart. Thank you for being the most amazing sister anyone could ask for. Love you forever!" }
        ];
    }

    // ROMANTIC PARTNERS - Married
    if (rel.includes('husband') || rel.includes('wife')) {
        const spouse = rel.includes('husband') ? 'husband' : 'wife';
        return [
            { emoji: '💑', year: 'When We Met', title: 'Love At First Sight', description: "I still remember the first time I saw you, the first time we talked, the moment I knew you were special. From that very beginning, there was something magical about us, something that made me believe in destiny and soulmates." },
            { emoji: '💍', year: 'Our Wedding Day', title: 'I Do', description: `The day I married you was the happiest day of my life. Standing there, looking into your eyes, promising forever - that moment was perfect. And every day since has been a beautiful chapter in our love story. Thank you for being my ${spouse}, my partner, my everything.` },
            { emoji: '💖', year: 'Our Forever', title: 'Endless Love', description: "With each passing year, I fall more in love with you. You're my first thought in the morning and my last at night. You're my best friend, my greatest adventure, and the love of my life. Here's to us and to forever!" }
        ];
    }

    // ROMANTIC PARTNERS - Dating
    if (rel.includes('boyfriend') || rel.includes('girlfriend') || rel.includes('partner')) {
        return [
            { emoji: '💕', year: 'The Beginning', title: 'When We Started', description: "I'll never forget when we first started dating - those butterflies, those long conversations, that excitement of getting to know someone amazing. From the very start, you made my heart skip a beat, and you still do every single day." },
            { emoji: '❤️', year: 'Falling Deeper', title: 'Best Moments', description: "Every moment with you has been special - from our adventures to our quiet nights in, from making each other laugh to supporting each other through tough times. You've shown me what it means to truly care for someone and be cared for in return." },
            { emoji: '💫', year: 'Our Future', title: 'Together Forever', description: "I'm so excited about where we're going and all the memories we have yet to create. Being with you feels right, and I can't wait to see what the future holds for us. Thank you for being you and for being mine!" }
        ];
    }

    // BEST FRIENDS
    if (rel.includes('best friend')) {
        return [
            { emoji: '🎉', year: 'The Beginning', title: 'How We Met', description: `I'll always remember how we became best friends. It feels like we just clicked instantly, like we were meant to find each other. From that moment on, you've been one of the most important people in my life, and I'm so grateful our paths crossed.` },
            { emoji: '😂', year: 'Epic Memories', title: 'Unforgettable Times', description: "We've shared so many incredible moments - adventures, inside jokes, late-night heart-to-hearts, and memories I'll treasure forever. You've been there through my best days and my worst, and somehow you always know exactly what to say (or when to just listen and be there)." },
            { emoji: '💙', year: 'Forever', title: 'Friends For Life', description: "You're not just my best friend - you're family I chose. No matter where life takes us, no matter how much time passes, you'll always be my person. Thank you for being the most amazing best friend anyone could ask for. Love you!" }
        ];
    }

    // GRANDPARENTS
    if (rel.includes('grandma') || rel.includes('grandmother')) {
        return [
            { emoji: '🏠', year: 'Childhood', title: "Grandma's House", description: `Some of my happiest childhood memories are at your house - the cookies, the stories, the unconditional love. You've always made me feel so special and loved, Grandma. Thank you for being such a wonderful presence in my life.` },
            { emoji: '📖', year: 'Wisdom', title: 'Life Lessons', description: "Your stories, your advice, your wisdom - they've all shaped who I am today. You've taught me so much about life, love, and what truly matters. I treasure every conversation we've had and every lesson you've shared." },
            { emoji: '💝', year: 'Always', title: 'Treasured Bond', description: "Our bond is something I treasure deeply. You're not just my grandmother - you're one of my greatest blessings. I love you so much, Grandma!" }
        ];
    }

    if (rel.includes('grandpa') || rel.includes('grandfather')) {
        return [
            { emoji: '🏠', year: 'Childhood', title: "Grandpa's Lessons", description: `From teaching me to fish to sharing your stories, you've been such an important part of my life, Grandpa. Those moments with you are some of my most cherished memories, and I'm so grateful for all the time we've spent together.` },
            { emoji: '🎓', year: 'Growing Up', title: 'Words of Wisdom', description: "Your guidance, your wisdom, your patient explanations - you've taught me so much about life and what it means to be a good person. I've always looked up to you and admired the man you are." },
            { emoji: '❤️', year: 'Forever', title: 'My Hero', description: "You've always been one of my heroes, Grandpa. Thank you for being such an amazing grandfather. I love you!" }
        ];
    }

    // DEFAULT - Friends and others
    return [
        { emoji: '🌟', year: 'The Beginning', title: 'When We First Met', description: `I'll always remember when we first became friends. From the beginning, there was something special about our connection. You brought new joy, laughter, and positivity into my life, and I'm so grateful our paths crossed.` },
        { emoji: '❤️', year: 'Great Times', title: 'Treasured Memories', description: "We've shared so many wonderful moments together - adventures, conversations, celebrations, and even the quiet times. Each memory with you is precious, and I treasure the bond we've built over time." },
        { emoji: '✨', year: 'Looking Forward', title: 'Many More To Come', description: "Here's to many more memories together, more laughter, more adventures, and more reasons to celebrate our friendship. Thank you for being such a wonderful presence in my life!" }
    ];
}

/**
 * Generate surprise message - EXPANDED & MORE EMOTIONAL
 */
export function generateSurpriseMessage(eventType, relationship, receiverName) {
    if (!receiverName || receiverName.trim() === '') {
        receiverName = 'you';
    }

    const messages = {
        birthday: `SURPRISE!! 🎉🎊

${receiverName}, I hope this special celebration has filled your heart with as much joy as you bring to everyone around you! You deserve to be celebrated not just today, but every single day.

This surprise is just a small token of how much you mean to me and how grateful I am to have you in my life. May this year ahead bring you endless happiness, amazing adventures, and all your dreams coming true!

Keep shining bright! You're absolutely amazing! ✨🎂`,

        anniversary: `Happy Anniversary! 💕

${receiverName}, here's to another beautiful year of love, laughter, and incredible memories together. You make every day special, and celebrating our love is one of my greatest joys!

Thank you for being my everything. Here's to us and to forever! 💖`,

        wedding: `Congratulations! 💒

${receiverName}, what a beautiful day to celebrate love! May your marriage be blessed with endless joy, deep love, and a lifetime of happiness together!

Wishing you both all the love in the world! 🥂💕`,

        success: `YOU DID IT!! 🏆

${receiverName}, I'm so incredibly proud of you! This success is so well-deserved, and watching you achieve your goals brings me so much joy!

This is just the beginning of even greater things to come. Keep shining! 🌟`,

        baby: `Congratulations on your bundle of joy! 👶

${receiverName}, your precious little one is here, and my heart is overflowing with happiness for you! Welcome to the most beautiful adventure of your life!

Wishing you all the love and joy in the world! 💕`,

        graduation: `Congratulations Graduate! 🎓

${receiverName}, you did it! All that hard work has paid off, and I couldn't be more proud of you!

Here's to your bright future and all the amazing things you'll achieve! 🌟`
    };

    return messages[eventType] || messages.birthday;
}

export default messageTemplates;
