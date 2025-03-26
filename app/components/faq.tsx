import React, { useState } from 'react';

const FAQ: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const toggleAnswer = (index: number) => {
        if (activeIndex === index) {
            setActiveIndex(null); // Collapse if clicked again
        } else {
            setActiveIndex(index); // Expand clicked question
        }
    };

    const faqData = [
        { question: 'What is senior scramble?', answer: `Senior scramble is an annual Columbia tradition that takes place in
        the 40 days before graduation. At various events leading up to May 1st
        (when final scrambles are released), students will party it up with
        their “unis” – a unique combination of numbers and letters assigned to
        us by Columbia as freshmen – written somewhere on their body. When
        someone sees someone that they are interested in “scrambling”, they
        take note of their uni and input it into our website. You can scramble
        a maximum of 10 people.
        
        There will be multiple rounds of scrambling, so get in line for your
        John Jay omelets at Wilma’s Grill! The first round will end on April
        19th at 11:59 PM and will be released the following day. The second
        round of scrambles will be released on May 1st at 11:59PM and will be
      released right after!
      You can edit your list up till the deadlines, we’ll be locking them in for you at 11:59 PM. For some,
      it is their last chance for love before graduation, for others, just fun…
      `},
        { question: 'What is the difference between regular, spicy, and discrete?', answer: `For our REGULAR mode (which we recommend), if the person you scramble
        scrambles you back we will notify BOTH of you. This is the classic
        version of senior scramble that most people participate in.

        For our daredevils, dauntless, district 12 (whoever you are), we
        introduce to you the SPICY version. For this, we will notify the
        person you scramble whether or not they scramble you back.

        For our discrete version, we will notify ONLY you if the person you
        scrambled scrambles you back. Ball’s in your court!` },
        { question: 'How do you increase your chances of a scramble?', answer: `Post on Instagram looking the hottest you’ve ever looked,
        go all out at events like senior night and boat cruise, add a sexy profile
        picture, fill out your profile entirely, thirst traps a plus, or even some
        wholesome content.` },
      {
        question: 'What do we do with your data?', answer: `
        All data you submit is anonymized and de-identified so that you can be sure
      that your matches and scrambles remain a secret. Egg shells may be fragile
      but our security is not.
        ` }
    ];
  

    return (
        <div className="mx-auto ">
            {faqData.map((item, index) => (
                <div key={index} className="border rounded-md overflow-hidden mb-4 ">
                    <div
                        className="bg-gray-200 p-4 cursor-pointer w-1000 hover:bg-gray-100"
                        onClick={() => toggleAnswer(index)}
                    >
                        <div className="text-sm md:text-lg font-medium text-gray-800">{item.question}</div>
                    </div>
                    {activeIndex === index && (
                        <div className="p-4 bg-white">
                            <div className="text-gray-700 text-sm md:text-lg">{item.answer}</div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default FAQ;