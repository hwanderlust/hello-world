import React from 'react';

class About extends React.Component {

  render() {
    return (
      <div className='about-container'>
        <div className='about-wrapper'>
          <header>
            <img src='https://images.pexels.com/photos/315658/pexels-photo-315658.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' alt='inspiration--bulb with green plant growing out of' className='top-img'/>
            <h1>Inspiration</h1>
            <section>
              <p>Each and every language has <span>their own personality, their own history, culture, and beauty.</span> It is a shame to see these languages gradually disappear!</p>

              <p>Growing up as a first-generation American <span>I regret not learning my parents' languages.</span> I mean, it's unnecessary in America, right?</p>

              <p>In Japanese or Korean, <span>"I miss you"</span> translates on the most simplest level to <span>"I want to see you (again)."</span> These subtleties may seem insignificant, but isn't it interesting and beautiful?</p>

              <p>"Overall, a median of <span>92%</span> of European students are learning a language in school." Compare that to a mere <span>20%</span> in America!</p>
            </section>
          </header>
          <aside>.....</aside>
          <main>
            <img src='https://images.pexels.com/photos/712786/pexels-photo-712786.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' alt='magnifying glass on city landscape with city buildings in focus'  className='top-img'/>
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
        </main>

        </div>
      </div>
    )
  }
};

export default About;
