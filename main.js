(function() {

  const container = document.querySelector('#container');
  const state = {
    word: "JSCONF.EU",
    size: 5,
    gridLetterMap: [
      [
        {
          letters: "JSCONFEU".split('')
        },
        {
          letters: "JSCOFE".split('')
        },
        {
          letters: "JSCOFE".split('')
        },
        {
          letters: "JSCOFE".split('')
        },
        {
          letters: "JSCONFEU".split('')
        },
      ],
      [
        {
          letters: "SCONFEU".split('')
        },
        {
          letters: "N".split('')
        },
        {
          letters: "J".split('')
        },
        {
          letters: []
        },
        {
          letters: "ONU".split('')
        },
      ],
      [
        {
          letters: "SCONFEU".split('')
        },
        {
          letters: "SFE".split('')
        },
        {
          letters: "JSNFE".split('')
        },
        {
          letters: "SFE".split('')
        },
        {
          letters: "SONFEU".split('')
        },
      ],
      [
        {
          letters: "CONFEU".split('')
        },
        {
          letters: []
        },
        {
          letters: "J".split('')
        },
        {
          letters: "N".split('')
        },
        {
          letters: "SONU".split('')
        },
      ],
      [
        {
          letters: "JSCONFEU".split('')
        },
        {
          letters: "JSCOEU".split('')
        },
        {
          letters: "JSCO.EU".split('')
        },
        {
          letters: "SCOEU".split('')
        },
        {
          letters: "SCONEU".split('')
        },
      ],
    ]
  }

  function makeGrid (letter) {
    let rows = []
    _(state.size).times(i => {
      let row = []
      _(state.size).times(j => {
        row.push({
          letter: letter,
          xPos: j,
          yPos: i,
          fill: state.gridLetterMap[i][j].letters.includes(letter),
          classList: "cell"
        })
      });
      rows.push(row);
    })
    return rows;
  }

  function makeLetters (letters) {
    state.letters = letters.map((letter) => {
      return {
        letter: letter,
        grid: makeGrid(letter)
      }
    })
  }

  function renderWord(data, into){
     into.innerHTML = `
       <div class="word">
          ${data.letters.map(letter => {
            return `${renderLetter(letter)}`
          }).join('')}
        </div>
      `
  }

  function renderLetter(letter) {
      return `
        <div class="letter">
          ${letter.grid.map(row => {
            return renderRow(row);
          }).join('')}
        </div>
      `
  }

  function renderRow(row) {
    return `
      <div class="row">
        ${row.map(cell => {
          return renderCell(cell);
        }).join('')}
      </div>
    `
  }

  function getRandomColor() {
    return _.sample([' jspink', ' jsblue', ' jsblack'])
  }

  function renderCell(cell) {
    return `
      <div class="${cell.classList}" data-xPos=${cell.xPos} data-yPos=${cell.yPos} data-fill=${cell.fill} data-letter=${cell.letter}></div>
    `
  }

  function getCell(letter, xPos, yPos) {
    let y = state.letters.find(x => {
      return x.letter == letter
    });

    return y.grid[yPos][xPos];
  }

  function handleCellMouseover(event) {
    let cell = getCell(
      event.currentTarget.getAttribute('data-letter'),
      event.currentTarget.getAttribute('data-xPos'),
      event.currentTarget.getAttribute('data-yPos')
    )

    if (!cell.fill || cell.filled) {
      return;
    }

    event.currentTarget.className += getRandomColor();
    event.currentTarget.removeEventListener("mouseover", handleCellMouseover, true);
    cell.filled = true;
  }

  makeLetters(state.word.split(''));
  renderWord(state, container);

  document.querySelectorAll('.cell').forEach(cell => {
    cell.addEventListener("mouseover", handleCellMouseover, false)
  })

})()