export function createCharacterStatsContent(): string {
  return `
    <div class="character-stats-content">
      <div class="stats-header">
        <div class="character-portrait">
          <div class="portrait-frame">
            <img src="/assets/characters/portrait/default-portrait.png" alt="Character Portrait" />
          </div>
          <div class="character-info">
            <h3 class="character-name">Player</h3>
            <p class="character-level">Level 1</p>
            <p class="character-class">Adventurer</p>
          </div>
          <div class="experience-section">
            <div class="experience-bar">
              <div class="exp-fill" style="width: 25%"></div>
              <span class="exp-text">250 / 1000 XP</span>
            </div>
            <div class="exp-info">
              <span class="next-level">750 XP to next level</span>
            </div>
          </div>
        </div>
      </div>
      
      <div class="character-main-layout">
        <!-- Left Column: Character Info and Skills -->
        <div class="character-left-column">
          <!-- Core Stats & Attributes Combined -->
          <div class="stats-section">
            <h4>Stats & Attributes</h4>
            <div class="stats-combined-grid">
              <div class="stat-group">
                <h5>Core Stats</h5>
                <div class="stat-item">
                  <span class="stat-name">Health</span>
                  <span class="stat-value">100/100</span>
                </div>
                <div class="stat-item">
                  <span class="stat-name">Mana</span>
                  <span class="stat-value">50/50</span>
                </div>
                <div class="stat-item">
                  <span class="stat-name">Energy</span>
                  <span class="stat-value">100/100</span>
                </div>
              </div>
              <div class="stat-group">
                <h5>Attributes</h5>
                <div class="stat-item">
                  <span class="stat-name">Strength</span>
                  <span class="stat-value">10</span>
                </div>
                <div class="stat-item">
                  <span class="stat-name">Dexterity</span>
                  <span class="stat-value">10</span>
                </div>
                <div class="stat-item">
                  <span class="stat-name">Intelligence</span>
                  <span class="stat-value">10</span>
                </div>
                <div class="stat-item">
                  <span class="stat-name">Vitality</span>
                  <span class="stat-value">10</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Active Skills Grid -->
          <div class="stats-section">
            <h4>Active Skills</h4>
            <div class="skills-grid">
              <!-- Spells -->
              <div class="skill-category">
                <h5>Spells</h5>
                <div class="skill-slots">
                  <div class="skill-slot filled" title="Fireball">
                    <div class="slot-icon">🔥</div>
                  </div>
                  <div class="skill-slot empty" title="Empty Slot">
                    <div class="slot-icon">🔮</div>
                  </div>
                  <div class="skill-slot empty" title="Empty Slot">
                    <div class="slot-icon">🔮</div>
                  </div>
                </div>
              </div>
              
              <!-- Abilities -->
              <div class="skill-category">
                <h5>Abilities</h5>
                <div class="skill-slots">
                  <div class="skill-slot filled" title="Power Strike">
                    <div class="slot-icon">⚔️</div>
                  </div>
                  <div class="skill-slot empty" title="Empty Slot">
                    <div class="slot-icon">💪</div>
                  </div>
                  <div class="skill-slot empty" title="Empty Slot">
                    <div class="slot-icon">💪</div>
                  </div>
                </div>
              </div>
              
              <!-- Traits -->
              <div class="skill-category">
                <h5>Traits</h5>
                <div class="skill-slots">
                  <div class="skill-slot filled" title="Warrior's Resolve">
                    <div class="slot-icon">🛡️</div>
                  </div>
                  <div class="skill-slot filled" title="Quick Reflexes">
                    <div class="slot-icon">⚡</div>
                  </div>
                  <div class="skill-slot empty" title="Empty Slot">
                    <div class="slot-icon">⭐</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column: Expanded Equipment Grid -->
        <div class="character-right-column">
          <div class="equipment-section">
            <h4>Equipment</h4>
            <div class="equipment-grid-expanded">
              <!-- Row 1 -->
              <div class="equipment-slot head" title="Head">
                <div class="slot-icon">🪖</div>
                <span class="slot-label">Head</span>
              </div>
              <div class="equipment-slot neck" title="Neck">
                <div class="slot-icon">📿</div>
                <span class="slot-label">Neck</span>
              </div>
              <div class="equipment-slot shoulders" title="Shoulders">
                <div class="slot-icon">🦽</div>
                <span class="slot-label">Shoulders</span>
              </div>
              <div class="equipment-slot cloak" title="Cloak">
                <div class="slot-icon">🧥</div>
                <span class="slot-label">Cloak</span>
              </div>

              <!-- Row 2 -->
              <div class="equipment-slot arms" title="Arms">
                <div class="slot-icon">🦾</div>
                <span class="slot-label">Arms</span>
              </div>
              <div class="equipment-slot chest filled" title="Leather Armor">
                <div class="slot-icon">🦺</div>
                <span class="slot-label">Chest</span>
              </div>
              <div class="equipment-slot wrists" title="Wrists">
                <div class="slot-icon">⌚</div>
                <span class="slot-label">Wrists</span>
              </div>
              <div class="equipment-slot tabard" title="Tabard">
                <div class="slot-icon">🎽</div>
                <span class="slot-label">Tabard</span>
              </div>

              <!-- Row 3 -->
              <div class="equipment-slot hands" title="Hands">
                <div class="slot-icon">🧤</div>
                <span class="slot-label">Hands</span>
              </div>
              <div class="equipment-slot waist" title="Waist">
                <div class="slot-icon">🔗</div>
                <span class="slot-label">Waist</span>
              </div>
              <div class="equipment-slot legs" title="Legs">
                <div class="slot-icon">👖</div>
                <span class="slot-label">Legs</span>
              </div>
              <div class="equipment-slot bag" title="Bag">
                <div class="slot-icon">🎒</div>
                <span class="slot-label">Bag</span>
              </div>

              <!-- Row 4 -->
              <div class="equipment-slot feet filled" title="Leather Boots">
                <div class="slot-icon">🥾</div>
                <span class="slot-label">Feet</span>
              </div>
              <div class="equipment-slot ring1" title="Ring 1">
                <div class="slot-icon">💍</div>
                <span class="slot-label">Ring 1</span>
              </div>
              <div class="equipment-slot ring2" title="Ring 2">
                <div class="slot-icon">💍</div>
                <span class="slot-label">Ring 2</span>
              </div>
              <div class="equipment-slot trinket" title="Trinket">
                <div class="slot-icon">🔮</div>
                <span class="slot-label">Trinket</span>
              </div>

              <!-- Row 5 -->
              <div class="equipment-slot main-hand filled" title="Iron Sword">
                <div class="slot-icon">⚔️</div>
                <span class="slot-label">Main Hand</span>
              </div>
              <div class="equipment-slot off-hand" title="Off Hand">
                <div class="slot-icon">🛡️</div>
                <span class="slot-label">Off Hand</span>
              </div>
              <div class="equipment-slot ranged" title="Ranged">
                <div class="slot-icon">🏹</div>
                <span class="slot-label">Ranged</span>
              </div>
              <div class="equipment-slot ammo" title="Ammo">
                <div class="slot-icon">🏹</div>
                <span class="slot-label">Ammo</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
} 