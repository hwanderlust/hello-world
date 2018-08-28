import React from 'react';

class About extends React.Component {

  render() {
    return (
      <div className='about-container'>
        <div className='about-wrapper'>

          <h1>Inspiration</h1>
          <p>Having had learned two foreign languages--at a conversational level--as an adult, I learned that each and every language has <span>their own personality, their own history, culture, and beauty.</span> It is a shame to see these languages gradually disappear as globalization increases and more and more folks concentrating on the most spoken languages around the globe.</p>

          <p>It's only natural people flock to the most common languages in the world to learn--for business, for studies, for politics, for communication--but does it make all other languages insignificant? Growing up as a first-generation American <span>I regret not learning my parents' languages.</span> I mean, it's unnecessary in America, right?</p>

          <p>Did you know that if you wanted to express feelings of missing someone in Japanese or Korean, you literally say you want to see/meet them? It never occurred to me that essentially <span>"I miss you" translates on the most simplest level to "I want to see you (again)."</span> These subtleties may seem insignificant, but isn't it interesting and beautiful?</p>

          <p>"Overall, a median of 92% of European students are learning a language in school." Compare that to a mere 20% in America!</p>

          <h1>Studies have shown</h1>
          
          <section className='align-left'>
            <img src='https://images.pexels.com/photos/346885/pexels-photo-346885.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' alt='hand holding small globe in nice landscape' className='left-img' />

            <div>
              <p>...students who became highly engaged in other cultures during the program had an <span>easier time holding multiple, conflicting viewpoints in mind at the same time.</span> Their interactions with other cultures gifted them a breadth of <span>perspective</span> they didn’t have before.</p>
            </div>
          </section>

          <section className='align-right'>
            <div>
              <p>“Foreign experiences increase both cognitive flexibility and depth and integrativeness of thought, the ability to make deep connections between disparate forms,” says Adam Galinsky...<span>Cognitive flexibility is the mind’s ability to jump between different ideas, a key component of creativity.</span></p>
            </div>

            <img src='https://images.pexels.com/photos/959058/pexels-photo-959058.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' alt='woman with buddhist-looking monk at a temple' className='right-img' />
          </section>

          <section className='align-left'>
            <img src='https://images.pexels.com/photos/716107/pexels-photo-716107.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' alt='colorful decorative plates' className='left-img' />

            <div>
              <p>But it’s <span>not just about being abroad</span>, Galinsky says: “The key, critical process is multicultural engagement, immersion, and adaptation. Someone who lives abroad and doesn’t engage with the local culture will likely get less of a creative boost than someone who travels abroad and really engages in the local environment.”</p>
            </div>
          </section>

          <section  className='align-right'>
            <div>
              <p>“...psychological research has shown now is that the ability to engage with people from different backgrounds than yourself, and the ability to get out of your own social comfort zone, is helping you to <span>build a strong and acculturated sense of your own self,”</span> she says.</p>
            </div>

            <img src='https://images.pexels.com/photos/1211968/pexels-photo-1211968.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' alt='holi celebration' className='right-img' />
          </section>

          <section className='align-left'>
            <img src='https://images.pexels.com/photos/6629/mountains-nature-sky-sunny.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' alt='woman on rocky cliff happy with arms up' className='left-img' />

            <p>“Our ability to differentiate our own beliefs and values … is tied up in the <span>richness of the cultural experiences that we have had.”</span></p>
          </section>

        </div>
      </div>
    )
  }
};

export default About;
